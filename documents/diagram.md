# Forms Platform - C4 diagram

```mermaid
flowchart TB
    %% External Users
    subgraph "External Users"
        formFiller[Form Filler: Submits forms]
        formCreator[Form Creator: Uses no-code interface to create forms]
        formReviewer[Form Reviewer: Reviews submitted forms]
    end

    %% Internal System
    subgraph "Forms Platform (Internal)"
        webServer[Node.js Web Server: Handles form creation, submission, and interactions]
        database[Postgres Database: Stores form data and user information]
    end

    %% Dummy node for layout control
    dummyNode[ ]:::invisible

    %% External Systems (grouped together, positioned below the Forms Platform)
    subgraph "External Systems"
        loginGov[Login.gov: Handles authentication]

        subgraph "Agency Systems"
            agencyBackend[Agency Backend Systems: Receives submitted form data]
            s3Bucket[S3 Bucket: Stores completed forms]
        end
    end

    %% Relationships between users and the internal system
    formCreator -->|Creates forms using| webServer
    formFiller -->|Submits forms via| webServer
    formReviewer -->|Reviews submitted forms using| webServer
    webServer -->|Stores and retrieves form data from| database

    %% Relationships with external systems (actions + HTTPS on separate lines)
    webServer -->|Authenticates form creators - https| loginGov
    webServer -->|Submits form data to Agency Backend - https| agencyBackend
    webServer -->|Uploads form PDFs to S3 Bucket - https| s3Bucket

    %% Forcing "External Systems" to be below "Forms Platform"
    webServer --> dummyNode
    dummyNode --> loginGov
```
