from datetime import datetime, timedelta
from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

class RuleEngine:
    def __init__(self):
        mongo_uri = os.getenv("MONGO_URI", "mongodb://localhost:27017/")
        self.client = MongoClient(mongo_uri)
        self.db = self.client.soc_shield
        
        # Define rules with severity scores
        self.rules = [
            {
                'name': 'Failed Login Attempt',
                'condition': lambda log: log['event_type'] == 'failed_login',
                'severity': 5,
                'description': 'Multiple failed login attempts detected'
            },
            {
                'name': 'Port Scan Detected',
                'condition': lambda log: log['event_type'] == 'port_scan',
                'severity': 7,
                'description': 'Potential port scanning activity'
            },
            {
                'name': 'Known Malicious IP',
                'condition': self._check_malicious_ip,
                'severity': 8,
                'description': 'Connection from known malicious IP'
            },
            {
                'name': 'High Frequency Events',
                'condition': self._check_event_frequency,
                'severity': 6,
                'description': 'Unusually high event frequency from source'
            }
        ]
    
    def _check_malicious_ip(self, log):
        """Check if IP is in our threat DB"""
        threat_ip = self.db.threat_ips.find_one({'ip': log['source_ip']})
        return threat_ip is not None
    
    def _check_event_frequency(self, log):
        """Check for high frequency events from same source"""
        time_threshold = datetime.utcnow() - timedelta(minutes=5)
        event_count = self.db.logs_parsed.count_documents({
            'source_ip': log['source_ip'],
            'timestamp': {'$gte': time_threshold}
        })
        return event_count > 10  # More than 10 events in 5 minutes
    
    def evaluate_log(self, parsed_log):
        """Evaluate log against all rules"""
        alerts = []
        
        for rule in self.rules:
            if rule['condition'](parsed_log):
                alert = {
                    'log_id': str(parsed_log['_id']),
                    'timestamp': parsed_log['timestamp'],
                    'source_ip': parsed_log['source_ip'],
                    'event_type': parsed_log['event_type'],
                    'rule_name': rule['name'],
                    'severity': rule['severity'],
                    'description': rule['description'],
                    'status': 'new'
                }
                alerts.append(alert)
        
        return alerts