# Shared terminology

This is an initial attempt at a [ubiquitous language](https://martinfowler.com/bliki/UbiquitousLanguage.html) for guided interviews.

- **Guided interview** - An expert-created process that efficiently collects required data from a user, in a manner that is accessible and equitable.
- **Interview data**
  - **Primary** - Data collected directly from a user.
  - **External** - Information provided to assist a user in making a selection.
  - **Result** - Output data structure created after successful interview completion.
- **Prompt** - The human-computer interface for requesting a single, primary data point. This interface may be optimized for input device, language, or other qualities; therefore, there may be more than one prompt for the same underlying data.
- **Interview strategy** - Rules that convert between a human-understandable representation of an interview - "ask these 5 questions in a row" - to an internal data structure suitable for controlling a view or backend service.
- **Interview session** - the information required to maintain progress through an interview.
- **Interview context** - the information required to display the current state of an on-going interview.
