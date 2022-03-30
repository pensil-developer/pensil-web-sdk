
# Pensil Web SDK 

The pensil web sdk can be used to leverage the functionalities of 
Pensil Social Platform.
It include the `PensilService` and `React UiKit` both.

## Installing Pensil Web SDK

Run the following command in your project

```
 npm i @pensil-inc/web-sdk@latest
```
or
```
 yarn add @pensil-inc/web-sdk@latest
```

## Using the web-sdk in a React App

### 1. Import and initialise the `PensilService`

```javascript
import { PensilService } from "@pensil-inc/web-sdk";
  const configuration = {
    token: "<user_token>",
    baseUrl: "<base_url>",
  };
  const pensil_service_instance = new PensilService(configuration);
```

In this step we are creating `pensil_service_instance`, which is 
consumable by the UIKit.

#### `configuration` object

The configuration object will receive the following properties - 

- `user_token` - user auth token, contact admin@pensil.com for more.
- `base_url` - the base url to apis, contact admin@pensil.com for more

### 2. Add the pensil stylesheets

```javascript
import "@pensil-inc/web-sdk/lib/esm/styles/index.css";
```
Pensil styles are scoped to the sdk components, 
so no need to worry about messing us your UI.

### 3. Import any UiKit element and use it

```javascript
import { UIKit } from "@pensil-inc/web-sdk";
...
  return (
    <div className="">
      <UIKit.SectionDetail service={pensil_service_instance} groupId="<group_id>" sectionId="<section_id>" />
    </div>
  );  
...

```
Each UIKit item has its own input requirement, which you can 
refer to the documentation to get more insights on.
Every UIkit item will have one thing in common and that is the 
`pensil_service_instance`, it is required to pass on the configurations
and the authorization details to the child components.

We have created `pensil_service_instance` in __Step 1__
## Demo

Simplest implementation for the SDK in new `create-react-app` - 

```javascript

import React from 'react';
import logo from './logo.svg';
import './App.css';
import { UIKit, PensilService } from "@pensil-inc/web-sdk";
import "@pensil-inc/web-sdk/lib/esm/styles/index.css";

function App() {

  const pensilServiceInstance = new PensilService({
    token: "<user_token>",
    baseUrl: "<base_url>",
  });

  return (
    <div className="">
      <UIKit.SectionDetail
        service={pensilServiceInstance}
        groupId="<group_id>"
        sectionId="<section_id>" />
    </div>
  );
}

export default App;

```

Please contact admin@pensil.in to get more details on the 
variables used.


## Authors

- [Shubham Singh Chahar](https://www.github.com/thefallenmerc)
- [Sonu Sharma](https://github.com/TheAlphamerc)


## Support

For support, email admin@pensil.in or join our Slack channel.

[Pensil](https://pensil.in)
