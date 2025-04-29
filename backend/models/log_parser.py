import re
from datetime import datetime

class LogParser:
    @staticmethod
    def parse_syslog(raw_log):
        """Parse common syslog formats"""
        # Example: "Jun 12 12:00:00 hostname sshd[1234]: Failed password for root from 192.168.1.1 port 22"
        syslog_pattern = r'^(\w{3}\s+\d{1,2}\s\d{2}:\d{2}:\d{2})\s(\S+)\s(\S+)\[(\d+)\]:\s(.+)$'
        match = re.match(syslog_pattern, raw_log)
        
        if match:
            timestamp_str, hostname, process, pid, message = match.groups()
            # Convert timestamp to ISO format (simplified)
            timestamp = datetime.strptime(f"{datetime.now().year} {timestamp_str}", "%Y %b %d %H:%M:%S").isoformat()
            
            # Extract common patterns from message
            source_ip = None
            event_type = "unknown"
            
            # Check for failed login
            if "Failed password" in message:
                event_type = "failed_login"
                ip_match = re.search(r'from (\d+\.\d+\.\d+\.\d+)', message)
                if ip_match:
                    source_ip = ip_match.group(1)
            
            # Check for port scan
            elif "port scan" in message.lower():
                event_type = "port_scan"
                ip_match = re.search(r'from (\d+\.\d+\.\d+\.\d+)', message)
                if ip_match:
                    source_ip = ip_match.group(1)
            
            return {
                'timestamp': timestamp,
                'hostname': hostname,
                'process': process,
                'pid': pid,
                'source_ip': source_ip,
                'event_type': event_type,
                'message': message
            }
        return None

    @staticmethod
    def parse_json(raw_log):
        """Parse JSON formatted logs"""
        import json
        try:
            log_data = json.loads(raw_log)
            # Normalize expected fields
            normalized = {
                'timestamp': log_data.get('timestamp'),
                'source_ip': log_data.get('source_ip') or log_data.get('src_ip'),
                'destination_ip': log_data.get('destination_ip') or log_data.get('dest_ip'),
                'event_type': log_data.get('event_type') or log_data.get('type'),
                'message': log_data.get('message') or raw_log
            }
            return normalized
        except json.JSONDecodeError:
            return None

    @staticmethod
    def parse(raw_log):
        """Try different parsing methods"""
        if isinstance(raw_log, dict):
            return raw_log  # Already parsed
        
        # Try JSON first
        parsed = LogParser.parse_json(raw_log)
        if parsed:
            return parsed
            
        # Then try syslog
        parsed = LogParser.parse_syslog(raw_log)
        if parsed:
            return parsed
            
        # Fallback
        return {
            'timestamp': datetime.utcnow().isoformat(),
            'source_ip': None,
            'destination_ip': None,
            'event_type': 'unknown',
            'message': raw_log
        }