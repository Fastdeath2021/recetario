import json
import os 
import uuid


class DBEngine:
    def __init__ (self, db_path):
        self.db_path = db_path
        if not os.path.exists(self.db_path):
            os.mkdir(self.db_path)

    def insert(self, document, data):
        doc_data= {}
        print (f"{self.db_path}/{document}.json")
        if os.path.exists(f"{self.db_path}/{document}.json"):
            with open(f"{self.db_path}/{document}.json", "r") as document_file:
                doc_data = json.loads(document_file.read())
        obj_id= uuid.uuid4().hex
        doc_data[obj_id]= data
        with open(f"{self.db_path}/{document}.json","w+") as document_file:
            document_file.write(json.dumps(doc_data))
        return obj_id

    def find(self, document, query=None):
        doc_data= {}
        if os.path.exists(f"{self.db_path}/{document}.json"):
            with open(f"{self.db_path}/{document}.json","r") as document_file:
                doc_data= json.loads(document_file.read())  
        if not query :
            return doc_data   
        obj_id=query.get("id")
        return doc_data.get(obj_id)
    

    def update(self, document, query, data):
        doc_data= {}
        if os.path.exists(f"{self.db_path}/{document}.json"):
            with open(f"{self.db_path}/{document}.json","r") as document_file:
                doc_data = json.loads(document_file.read())
        obj_id= query.get("id")
        doc_data[obj_id].update(data)
        with open(f"{self.db_path}/{document}.json","w+") as document_file:
            document_file.write(json.dumps(doc_data))
    






    def delete(self, document, query):
        doc_data= {}
        if os.path.exists(f"{self.db_path}/{document}.json"):
            with open(f"{self.db_path}/{document}.json","r") as document_file:
                doc_data = json.loads(document_file.read())
        obj_id= query.get("id")
        del doc_data[obj_id]
        with open(f"{self.db_path}/{document}.json","w+") as document_file:
            document_file.write(json.dumps(doc_data))
        