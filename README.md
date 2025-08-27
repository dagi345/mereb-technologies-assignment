# mereb-technologies-assignment

# mereb-technologies-assignment

| Stack                        | Command                                                                      |
| ---------------------------- | ---------------------------------------------------------------------------- |
| Backend (Node + Express) | cd backend → npm install → npm run build → npm start                 |
| Frontend (Next.js 14)    | cd frontend → npm install → npm run dev                                |
| Full stack               | Backend on http://localhost:4000  <br> Frontend on http://localhost:3000 |

Jest testing is also included and here is how to test it 

| Test type              | Command                                                 |
| ---------------------- | ------------------------------------------------------- |
| Backend unit tests | cd backend → npm test                               |
| Frontend manual    | cd frontend → open browser at http://localhost:3000 |


Memory efficiency strategy

Stream, don’t load
    i open the CSV with fs.createReadStream. This gives me tiny chunks (a few KB at a time) instead of the entire file. sinceA 5 GB file never sits in RAM.
    One tiny dictionary
While each chunk flows through the parser it only keep one object in memory:
  { Electronics: 250, Clothing: 200, … }
  Its size equals the number of unique departments (usually dozens, not millions).
Stream out the result
  Once the totals are ready we again stream-write (fs.createWriteStream) the new CSV row-by-row, so the output file is also never fully buffered.

<img width="570" height="665" alt="image" src="https://github.com/user-attachments/assets/33a5cfa1-ccc7-4340-956b-ab3c860807b5" />




<img width="570" height="665" alt="image" src="https://github.com/user-attachments/assets/3e2b3be6-9258-4e6f-83a8-b3b7681ee351" />
