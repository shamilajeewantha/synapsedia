# Controlling Raspberry Pi GPIO Pins Remotely Using Windows Laptop

## Overview:
This guide explains how to control GPIO (General Purpose Input/Output) pins on a Raspberry Pi remotely using a Windows laptop on the same network. By enabling the remote GPIO service on the Raspberry Pi and configuring the Windows laptop, you can interact with the GPIO pins from a distance.

## Prerequisites:
- Raspberry Pi setup and connected to the same network as the Windows laptop.
- Python installed on both the Raspberry Pi and the Windows laptop.
- GPIO Zero library installed on both systems.

## Steps:

1. **Enable Remote GPIO Service on Raspberry Pi:**
   - Connect to your Raspberry Pi either via SSH or directly using a monitor and keyboard.
   - Open a terminal window on the Raspberry Pi.
   - Install the gpiozero library if not already installed:
     ```
     pip install gpiozero
     ```
   - Enable the remote GPIO server by running the following command:
     ```
     gpio remote
     ```
   - The service should now be running on the default port 8888.

2. **Configure Windows Laptop:**
   - Open PowerShell on your Windows laptop.
   - Set the environment variable `PIGPIO_ADDR` to the IP address of your Raspberry Pi. For example:
     ```
     $env:PIGPIO_ADDR="192.168.188.79"
     ```
   - Ensure Python is installed on your Windows laptop.

3. **Write Python Script:**
   - Write a Python script on your Windows laptop using the GPIO Zero library to interact with the GPIO pins on the Raspberry Pi.
   - Here is an example script (`remote_gpio_windows.py`) that toggles a GPIO pin:
     ```python
     from gpiozero import LED
     from time import sleep

     led = LED(17)  # Example GPIO pin, change as needed

     while True:
         led.toggle()
         sleep(1)
     ```

4. **Run Python Script:**
   - In the PowerShell window on your Windows laptop, navigate to the directory containing the Python script (`remote_gpio_windows.py`).
   - Run the Python script:
     ```
     python .\remote_gpio_windows.py
     ```

5. **Interact with GPIO Pins:**
   - Your Python script running on the Windows laptop should now be able to control the GPIO pins on the Raspberry Pi remotely.

## Additional Notes:
- Ensure that both the Raspberry Pi and the Windows laptop are connected to the same network.
- Modify the Python script as needed to control specific GPIO pins and perform desired actions.
- Always handle GPIO pins with caution to avoid damage to the Raspberry Pi or connected components.
