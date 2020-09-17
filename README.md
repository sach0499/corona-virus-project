# Corona Virus Project
A Project tracking spread of COVID-19 in India. [Live Demo](https://covind.netlify.app/)

---

## FRONTEND

---

### Aggregate data for the current day
![Aggregate Data](/images/toppart.png)

---

### Charts showing previous 10 days history
![Chart1](/images/Chart1.png)
![Chart2](/images/Chart2.png)

---

### State Wise Cases (with sorting)
![Table](/images/table.png)

---

## BACKEND

The backend API for this project exposes two routes. These are shown below.

The data is scraped from the Ministry of Health and Welfare [website](https://www.mohfw.gov.in/) using a Headless Chromium Node.js API known as [Puppeteer](https://github.com/puppeteer/puppeteer). 

1. GET https://covindappbackend.herokuapp.com/api/v1/states
 - Query Parameter: sort. Sorts the array on the basis of following possible values: name, totalActive, totalDeceased, totalRecovered. Substituting a "-" infront of sort parameter sorts in descending order. Default is "-name"
 - Successfull response includes a "success" status and array of state objects as follows:
        
        {
        totalActive:196,
        increaseActive:-8,
        totalRecovered:3345,
        increaseRecovered:27,
        totalDeaths:52,
        increaseDeaths:0,
        name:"Andaman and Nicobar Islands"
        }
        
1. GET https://covindappbackend.herokuapp.com/api/v1/histories
 - Query Parameter: limit. Limit the number of documents to this number. Defalut is 10
 - Successfull response includes a "success" status and array of aggregate objects as follows:
        
        {
          {  
            totalActive:896887,
            increaseActive:14135,
            totalRecovered:3396033,
            increaseRecovered:74608,
            totalDeaths:73920,
            increaseDeaths:1107
          },
          createdOn:"9-09-2020"
        }