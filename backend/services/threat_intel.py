import requests
from pymongo import MongoClient
import os
from dotenv import load_dotenv
from datetime import datetime, timedelta

load_dotenv()

class ThreatIntel:
    def __init__(self):
        mongo_uri = os.getenv("MONGO_URI", "mongodb://localhost:27017/")
        self.client = MongoClient(mongo_uri)
        self.db = self.client.soc_shield
        self.abuseipdb_key = os.getenv("41545e014b6746ffa5000f0a16d7cf42264a60c102edaf177ecb72a55edb1c583cdae2c2307c27f7")
    
    def check_ip_abuseipdb(self, ip):
        """Check IP reputation with AbuseIPDB"""
        if not self.abuseipdb_key:
            return None
            
        # Check cache first
        cached = self.db.threat_cache.find_one({
            'ip': ip,
            'last_checked': {'$gte': datetime.utcnow() - timedelta(days=1)}
        })
        if cached:
            return cached.get('abuse_score', 0)
        
        # Call API if not in cache
        url = f"https://api.abuseipdb.com/api/v2/check?ipAddress={ip}"
        headers = {
            'Key': self.abuseipdb_key,
            'Accept': 'application/json'
        }
        
        try:
            response = requests.get(url, headers=headers)
            data = response.json()
            score = data['data']['abuseConfidenceScore']
            
            # Cache the result
            self.db.threat_cache.update_one(
                {'ip': ip},
                {'$set': {
                    'ip': ip,
                    'abuse_score': score,
                    'last_checked': datetime.utcnow()
                }},
                upsert=True
            )
            
            # Also store in our threat_ips collection if score is high
            if score > 50:
                self.db.threat_ips.update_one(
                    {'ip': ip},
                    {'$set': {'ip': ip, 'score': score}},
                    upsert=True
                )
            
            return score
        except Exception as e:
            print(f"Error checking AbuseIPDB: {e}")
            return None

# Example usage:
# threat_intel = ThreatIntel()
# score = threat_intel.check_ip_abuseipdb("1.2.3.4")