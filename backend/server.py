from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class EnquiryCreate(BaseModel):
    student_name: str
    parent_name: str
    phone: str
    email: EmailStr
    previous_school: str
    preferred_stream: str
    message: Optional[str] = ""

class Enquiry(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    student_name: str
    parent_name: str
    phone: str
    email: str
    previous_school: str
    preferred_stream: str
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class Notice(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str
    title: str
    content: str
    date: str
    category: str

# Routes
@api_router.get("/")
async def root():
    return {"message": "Circle Concept School API"}

@api_router.post("/enquiry", response_model=Enquiry)
async def create_enquiry(input: EnquiryCreate):
    enquiry_dict = input.model_dump()
    enquiry_obj = Enquiry(**enquiry_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = enquiry_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    _ = await db.enquiries.insert_one(doc)
    return enquiry_obj

@api_router.get("/enquiries", response_model=List[Enquiry])
async def get_enquiries():
    enquiries = await db.enquiries.find({}, {"_id": 0}).to_list(1000)
    
    for enquiry in enquiries:
        if isinstance(enquiry['created_at'], str):
            enquiry['created_at'] = datetime.fromisoformat(enquiry['created_at'])
    
    return enquiries

@api_router.get("/notices", response_model=List[Notice])
async def get_notices():
    # Sample notices - can be moved to database later
    notices = [
        {
            "id": "1",
            "title": "Admission Open for 2026-28 Batch",
            "content": "Applications are now being accepted for the new academic session. Limited seats available.",
            "date": "2026-01-15",
            "category": "Admission"
        },
        {
            "id": "2",
            "title": "JEE Main Mock Test Schedule",
            "content": "All-India level mock test scheduled for January 30, 2026. Compulsory for all students.",
            "date": "2026-01-10",
            "category": "Examination"
        },
        {
            "id": "3",
            "title": "Parent-Teacher Meeting",
            "content": "Monthly PTM scheduled for February 5, 2026. Attendance is mandatory.",
            "date": "2026-01-08",
            "category": "Event"
        }
    ]
    return notices

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()