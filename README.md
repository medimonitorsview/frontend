# How to run the Frontend?
[Install NPM](https://nodejs.org/en/download/)
on the machine. 

1. npm install
2. Open Terminal/CMD
2. cd <Folder_Path>
3. Write: 'ng serve'
4. The server is up on localhost:4200


## Settings

### Setting Server IP
- Open "Settings" tab, set the IP address of the remote server (Keep blank for localhost) and press 'Update Server IP' button.

### Setting alert time limit:
- Alert(Red Font) will appear on specific patient if the last image time is not up-to-date by 'T' seconds.
- For example: 
  - The time that image captured is 10:00:00, T = 10. So if the next image will not arrive until 10:00:10, an alert will popup.
- The user can edit the time-limit-alert ('T') by openning "Settings" tab, set the Time-Limit-Alert field and press 'Update Time limit' button.


## Control Management:
   * After setting the server's IP, The Control Management automatically will update the content of the patients.
    
#### Left Click On Patient
   * The user can left-click on each patient for more information, a dialog will popup.
   * The dialog has all of the important information about the patient, all the connected devices (like monitor, respirator and ivac) and all the monitored fields in each one of them.
  
#### Right Click On Patient
   * The user can right-click on each patient for quick delete actions of monitors or entire patient data.


## Patient Management Table:
   * After setting the server's IP, The Patient Management Table will automatically update the content of the patients.
   
#### Whats information inside the table?
   * The table summarize the patients information, For each patient, which devices he has.
   * For each device, the user can show the QR-Code of the specific device, and delete the device (By pressing the red 'Delete' button).
   * The user can update the patientId and room number by change the relevant field and press the green 'Update' button.


## Application page
   * The user can upload application (Should be APK file, but not limited only to APK) to the server.
     - Set version number (NUMBER ONLY - Int/Double), then set the application name, then press 'Upload' button and select the application file.
   * The user can download application that already uploaded by searching the application name and version.

## Print QR-Codes
   * The user can print all the QR-Codes of the monitors by click 'Print QR-Codes' button on the side-menu.
   

# Development Requirements

   * Linux\Windows OS.
   * [Install NPM](https://nodejs.org/en/download/)
   * Open Terminal/CMD at the project's root folder and write: 'npm install'
   
   

   
