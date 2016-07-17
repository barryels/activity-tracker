global CONFIG_SERVER_PORT
global CONFIG_CLIENT_CHECK_INTERVAL_IN_SECONDS
global CONFIG_CLIENT_CHECK_DEVICE_CLAMSHELL_STATE

global previousProcessName
global previousWindowTitle
global previousDevicePowerState
global previousDeviceClamshellState

global mePath
global projectPath

on encode_char(this_char)
	set the ASCII_num to (the ASCII number this_char)
	set the hex_list to {"0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"}
	set x to item ((ASCII_num div 16) + 1) of the hex_list
	set y to item ((ASCII_num mod 16) + 1) of the hex_list
	return ("%" & x & y) as string
end encode_char


on encode_text(this_text, encode_URL_A, encode_URL_B)
	set the standard_characters to "abcdefghijklmnopqrstuvwxyz0123456789"
	set the URL_A_chars to "$+!'/?;&@=#%><{}[]\"~`^\\|*"
	set the URL_B_chars to ".-_:"
	set the acceptable_characters to the standard_characters
	if encode_URL_A is false then set the acceptable_characters to the acceptable_characters & the URL_A_chars
	if encode_URL_B is false then set the acceptable_characters to the acceptable_characters & the URL_B_chars
	set the encoded_text to ""
	repeat with this_char in this_text
		if this_char is in the acceptable_characters then
			set the encoded_text to (the encoded_text & this_char)
		else
			set the encoded_text to (the encoded_text & encode_char(this_char)) as string
		end if
	end repeat
	return the encoded_text
end encode_text


on getFrontmostProcess()
	tell application "System Events"
		if exists process "ScreenSaverEngine"
			set frontmostProcess to {name: "device.Screensaver"}
		else
			set frontmostProcess to first process where frontmost is true
		end if
	end tell
	return frontmostProcess
end getFrontmostProcess


on getProcessActiveWindow(_process)

	set _processName to (name of _process)

	if _processName is "Google Chrome"
		tell application "Google Chrome" to return URL of active tab of front window
	else
		try
			return name of window of _process
		end try
	end if

	return ""

end getProcessActiveWindow


on trackActivity()
	set doRequest to true

	set DevicePowerState to do shell script "ioreg -n IODisplayWrangler | grep -i IOPowerManagement"

	if DevicePowerState contains "\"CurrentPowerState\"=4" then
		if previousDevicePowerState does not equal "4"
			set previousDevicePowerState to "4" -- awake
			return my postActivityData("device.PowerState", "AWAKE")
		end if
	else if DevicePowerState contains "\"CurrentPowerState\"=1" then
		if previousDevicePowerState does not equal "1"
			set previousDevicePowerState to "1" -- asleep
			return my postActivityData("device.PowerState", "ASLEEP")
		end if
	end if


	if CONFIG_CLIENT_CHECK_DEVICE_CLAMSHELL_STATE equals true
		set DeviceClamshellState to do shell script "ioreg -r -k AppleClamshellState -d 4 | grep AppleClamshellState  | head -1"

		if DeviceClamshellState contains "Yes"
			if previousDeviceClamshellState does not equal "YES"
				set previousDeviceClamshellState to "YES"
				return my postActivityData("device.ClamshellState", "YES")
			end if
		else
			if previousDeviceClamshellState does not equal "NO"
				set previousDeviceClamshellState to "NO"
				return my postActivityData("device.ClamshellState", "NO")
			end if
		end if
	end if


	set process to my getFrontmostProcess()
	set processName to encode_text(name of process as text, true, true)
	set windowTitle to encode_text(((my getProcessActiveWindow(process)) as text), true, true)

	if processName equals previousProcessName
		if windowTitle equals previousWindowTitle
			set doRequest to false
		end if
	end if

	set previousProcessName to processName
	set previousWindowTitle to windowTitle

	if doRequest equals true
		return my postActivityData(processName, windowTitle)
	end if

end trackActivity


on postActivityData(applicationName, windowTitle)
	set shellScript to "curl -X POST 'http://localhost:" & CONFIG_SERVER_PORT & "/activity?a='" & applicationName & "'&w=" & windowTitle & "'"

	try
		return do shell script shellScript & " > /dev/null 2>&1 &"
	end try

	return ""
end postActivityData


on startServer()
	do shell script "/usr/local/bin/node '" & projectPath & "server/index.js' > /dev/null 2>&1 &"
end startServer


set CONFIG_CLIENT_CHECK_DEVICE_CLAMSHELL_STATE to false
set CONFIG_SERVER_PORT to "9999"
set CONFIG_CLIENT_CHECK_INTERVAL_IN_SECONDS to 1

set previousProcessName to ""
set previousWindowTitle to ""
set previousDevicePowerState to ""
set previousDeviceClamshellState to ""

set mePath to POSIX path of ((path to me as text) & "::")
set projectPath to mePath & "../../"

my startServer()

repeat
	my trackActivity()
	delay(CONFIG_CLIENT_CHECK_INTERVAL_IN_SECONDS)
end repeat
