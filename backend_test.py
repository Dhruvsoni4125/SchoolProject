#!/usr/bin/env python3

import requests
import sys
import json
from datetime import datetime

class CircleConceptAPITester:
    def __init__(self, base_url="https://circle-concept-sci.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.results = []

    def log_result(self, test_name, success, details=""):
        """Log test result"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
        
        result = {
            "test": test_name,
            "status": "PASS" if success else "FAIL", 
            "details": details,
            "timestamp": datetime.now().isoformat()
        }
        self.results.append(result)
        
        status_icon = "✅" if success else "❌"
        print(f"{status_icon} {test_name}: {details}")

    def test_api_root(self):
        """Test API root endpoint"""
        try:
            response = requests.get(f"{self.api_url}/", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if "message" in data and "Circle Concept" in data["message"]:
                    self.log_result("API Root", True, f"Status: {response.status_code}, Message: {data['message']}")
                    return True
                else:
                    self.log_result("API Root", False, f"Unexpected response: {data}")
                    return False
            else:
                self.log_result("API Root", False, f"HTTP {response.status_code}: {response.text[:100]}")
                return False
        except Exception as e:
            self.log_result("API Root", False, f"Request failed: {str(e)}")
            return False

    def test_notices_endpoint(self):
        """Test notices endpoint"""
        try:
            response = requests.get(f"{self.api_url}/notices", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list) and len(data) > 0:
                    # Check first notice structure
                    notice = data[0]
                    required_fields = ["id", "title", "content", "date", "category"]
                    missing_fields = [f for f in required_fields if f not in notice]
                    
                    if not missing_fields:
                        self.log_result("GET Notices", True, f"Found {len(data)} notices with proper structure")
                        return True
                    else:
                        self.log_result("GET Notices", False, f"Missing fields in notice: {missing_fields}")
                        return False
                else:
                    self.log_result("GET Notices", False, f"No notices found or invalid format: {type(data)}")
                    return False
            else:
                self.log_result("GET Notices", False, f"HTTP {response.status_code}: {response.text[:100]}")
                return False
        except Exception as e:
            self.log_result("GET Notices", False, f"Request failed: {str(e)}")
            return False

    def test_enquiry_submission(self):
        """Test enquiry form submission"""
        test_enquiry = {
            "student_name": "Test Student",
            "parent_name": "Test Parent", 
            "phone": "+91 9876543210",
            "email": "test@example.com",
            "previous_school": "Test High School",
            "preferred_stream": "PCM (Physics, Chemistry, Mathematics) - JEE",
            "message": "This is a test enquiry submission"
        }

        try:
            response = requests.post(
                f"{self.api_url}/enquiry",
                json=test_enquiry,
                headers={"Content-Type": "application/json"},
                timeout=15
            )
            
            if response.status_code == 200:
                data = response.json()
                # Check if response contains expected fields
                required_fields = ["id", "student_name", "parent_name", "phone", "email"]
                missing_fields = [f for f in required_fields if f not in data]
                
                if not missing_fields:
                    self.log_result("POST Enquiry", True, f"Enquiry created with ID: {data.get('id', 'N/A')}")
                    return True, data.get("id")
                else:
                    self.log_result("POST Enquiry", False, f"Missing fields in response: {missing_fields}")
                    return False, None
            else:
                self.log_result("POST Enquiry", False, f"HTTP {response.status_code}: {response.text[:200]}")
                return False, None
        except Exception as e:
            self.log_result("POST Enquiry", False, f"Request failed: {str(e)}")
            return False, None

    def test_enquiries_list(self):
        """Test getting list of enquiries"""
        try:
            response = requests.get(f"{self.api_url}/enquiries", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    self.log_result("GET Enquiries", True, f"Retrieved {len(data)} enquiries")
                    return True
                else:
                    self.log_result("GET Enquiries", False, f"Invalid response format: {type(data)}")
                    return False
            else:
                self.log_result("GET Enquiries", False, f"HTTP {response.status_code}: {response.text[:100]}")
                return False
        except Exception as e:
            self.log_result("GET Enquiries", False, f"Request failed: {str(e)}")
            return False

    def test_invalid_enquiry_submission(self):
        """Test enquiry submission with invalid data"""
        invalid_enquiry = {
            "student_name": "",  # Empty required field
            "parent_name": "Test Parent",
            "phone": "invalid-phone",  # Invalid format 
            "email": "not-an-email",  # Invalid email
            "previous_school": "Test School",
            "preferred_stream": "Invalid Stream"
        }

        try:
            response = requests.post(
                f"{self.api_url}/enquiry",
                json=invalid_enquiry,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            # Should return 422 for validation errors
            if response.status_code == 422:
                self.log_result("POST Invalid Enquiry", True, f"Properly rejected invalid data with 422")
                return True
            elif response.status_code == 400:
                self.log_result("POST Invalid Enquiry", True, f"Properly rejected invalid data with 400")
                return True
            else:
                self.log_result("POST Invalid Enquiry", False, f"Expected 422/400 but got {response.status_code}")
                return False
        except Exception as e:
            self.log_result("POST Invalid Enquiry", False, f"Request failed: {str(e)}")
            return False

    def run_all_tests(self):
        """Run all backend API tests"""
        print("🧪 Starting Circle Concept School Backend API Tests")
        print("=" * 60)
        
        # Test API connectivity
        api_available = self.test_api_root()
        
        if not api_available:
            print("\n❌ API not available, stopping further tests")
            return self.generate_report()
        
        # Test all endpoints
        self.test_notices_endpoint()
        success, enquiry_id = self.test_enquiry_submission()
        self.test_enquiries_list()
        self.test_invalid_enquiry_submission()
        
        return self.generate_report()

    def generate_report(self):
        """Generate final test report"""
        print("\n" + "=" * 60)
        print(f"📊 Test Results: {self.tests_passed}/{self.tests_run} tests passed")
        print(f"Success Rate: {(self.tests_passed/self.tests_run)*100:.1f}%" if self.tests_run > 0 else "No tests run")
        
        # Group results by status
        passed = [r for r in self.results if r["status"] == "PASS"]
        failed = [r for r in self.results if r["status"] == "FAIL"]
        
        if failed:
            print("\n❌ Failed Tests:")
            for result in failed:
                print(f"   - {result['test']}: {result['details']}")
        
        if passed:
            print(f"\n✅ Passed Tests: {len(passed)}")
            
        return {
            "total_tests": self.tests_run,
            "passed_tests": self.tests_passed,
            "failed_tests": self.tests_run - self.tests_passed,
            "success_rate": (self.tests_passed/self.tests_run)*100 if self.tests_run > 0 else 0,
            "details": self.results
        }

def main():
    tester = CircleConceptAPITester()
    report = tester.run_all_tests()
    
    # Exit with error code if tests failed
    if report["failed_tests"] > 0:
        return 1
    return 0

if __name__ == "__main__":
    sys.exit(main())