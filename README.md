# Firestore Chat

## Feature List

1. Realtime Chat with google firestore database
2. One 2 One chat
3. Group Chat
4. Unread message count
5. Vuex Integration

## Technology

1. Vue Js 2
2. Vuex
3. Firebase Firestore Database

## Firebase Account setup:
1. Go to Firebase Console (https://console.firebase.google.com/)
2. Click on add project
![image](https://user-images.githubusercontent.com/19352999/122765457-5666d400-d2c2-11eb-9a3c-adaa103a7d29.png)
3. Enter project name and continue
![image](https://user-images.githubusercontent.com/19352999/122758473-a6da3380-d2ba-11eb-9b1f-e6587eb440e8.png)
4. Turn off google analytics and click create project
![image](https://user-images.githubusercontent.com/19352999/122758566-c3766b80-d2ba-11eb-8344-1ac24f7f1ae5.png)
5. Click continue when project is ready
![image](https://user-images.githubusercontent.com/19352999/122758812-0fc1ab80-d2bb-11eb-8033-f2e6d2e0f11d.png)
6. Click on Firestore Database then create database
![image](https://user-images.githubusercontent.com/19352999/122759218-8494e580-d2bb-11eb-8d14-425a9bcff372.png)
7. Choose start in test mode and click Next
![image](https://user-images.githubusercontent.com/19352999/122759441-bf971900-d2bb-11eb-9490-4b5af0d35160.png)
8. Choose location and click Enable
![image](https://user-images.githubusercontent.com/19352999/122759516-d9d0f700-d2bb-11eb-9f99-7d9cbb98c194.png)
9. You will be presented with the following screen
![image](https://user-images.githubusercontent.com/19352999/122759706-113fa380-d2bc-11eb-83a4-f5313ea65f5a.png)
10. Create 3 collections with the following names: (conversations,messages,unread_records). See the screenshot below.
![image](https://user-images.githubusercontent.com/19352999/122760116-9034dc00-d2bc-11eb-9c37-073f31c0cf6c.png)
11. Go to project settings
![image](https://user-images.githubusercontent.com/19352999/122760322-ce320000-d2bc-11eb-89d5-c927335dddfc.png)
12. Click on create app button
![image](https://user-images.githubusercontent.com/19352999/122760669-2ec13d00-d2bd-11eb-9ebc-ed6d8331621d.png)
13. Enter App nickname and click register app
![image](https://user-images.githubusercontent.com/19352999/122760761-4b5d7500-d2bd-11eb-9e67-d81de049f407.png)
14. You will be presented with firebase sdk config data. Copy the firebaseConfig info for later use.
![image](https://user-images.githubusercontent.com/19352999/122761295-e5252200-d2bd-11eb-8025-e315f398beb2.png)

## Project Setup

### 1. Clone this repository
```
git clone https://github.com/AhnafMuttaki/firestore_chat.git
```

### 2. Open terminal in project folder
### 3. Install required packages
```
npm install
```
### 3. Rename firebase config file.
1. Rename PROJECT_ROOT/src/configs/firebaseExample.js to PROJECT_ROOT/src/configs/firebase.js
2. Fill up the data of the firebase.js config file with firebaseConfig info data from firebase

### 4. Run app
```
npm run serve
```
### 5. Open two window in 2 browsers and login with mock users to test chat application
