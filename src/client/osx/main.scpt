global CONFIG_SERVER_PORT
global CONFIG_CLIENT_CHECK_INTERVAL_IN_SECONDS
global CONFIG_CLIENT_CHECK_DEVICE_LIDSTATE

global PROCESS_NAME_SCREENSAVER
global WINDOW_TITLE_SCREENSAVER_START
global WINDOW_TITLE_SCREENSAVER_END

global PROCESS_NAME_DEVICE_POWERSTATE
global WINDOW_TITLE_DEVICE_POWERSTATE_AWAKE
global WINDOW_TITLE_DEVICE_POWERSTATE_ASLEEP

global PROCESS_NAME_DEVICE_LIDSTATE
global WINDOW_TITLE_DEVICE_LIDSTATE_OPEN
global WINDOW_TITLE_DEVICE_LIDSTATE_CLOSED

global PROCESS_NAME_ACTIVITY_TRACKER

global previousProcessName
global previousWindowTitle
global previousDevicePowerState
global previousDeviceLidState

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
			set frontmostProcess to {name: PROCESS_NAME_SCREENSAVER}
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
	else if _processName is PROCESS_NAME_SCREENSAVER
		return WINDOW_TITLE_SCREENSAVER_START
	else
		try
			return name of window of _process
		end try
	end if

	if previousProcessName equals PROCESS_NAME_SCREENSAVER
		return WINDOW_TITLE_SCREENSAVER_END
	end if

	return ""

end getProcessActiveWindow


on trackActivity()
	set doRequest to true

	set DevicePowerState to do shell script "ioreg -n IODisplayWrangler | grep -i IOPowerManagement"

	if DevicePowerState contains "\"CurrentPowerState\"=4" then
		if previousDevicePowerState does not equal WINDOW_TITLE_DEVICE_POWERSTATE_AWAKE
			set previousDevicePowerState to WINDOW_TITLE_DEVICE_POWERSTATE_AWAKE
			return my postActivityData(PROCESS_NAME_DEVICE_POWERSTATE, WINDOW_TITLE_DEVICE_POWERSTATE_AWAKE)
		end if
	else if DevicePowerState contains "\"CurrentPowerState\"=1" then
		if previousDevicePowerState does not equal WINDOW_TITLE_DEVICE_POWERSTATE_ASLEEP
			set previousDevicePowerState to WINDOW_TITLE_DEVICE_POWERSTATE_ASLEEP
			return my postActivityData(PROCESS_NAME_DEVICE_POWERSTATE, WINDOW_TITLE_DEVICE_POWERSTATE_ASLEEP)
		end if
	end if


	if CONFIG_CLIENT_CHECK_DEVICE_LIDSTATE equals true
		set DeviceLidState to do shell script "ioreg -r -k AppleClamshellState -d 4 | grep AppleClamshellState  | head -1"

		if DeviceLidState contains "Yes"
			if previousDeviceLidState does not equal WINDOW_TITLE_DEVICE_LIDSTATE_OPEN
				set previousDeviceLidState to WINDOW_TITLE_DEVICE_LIDSTATE_OPEN
				return my postActivityData(PROCESS_NAME_DEVICE_LIDSTATE, WINDOW_TITLE_DEVICE_LIDSTATE_OPEN)
			end if
		else
			if previousDeviceLidState does not equal WINDOW_TITLE_DEVICE_LIDSTATE_CLOSED
				set previousDeviceLidState to WINDOW_TITLE_DEVICE_LIDSTATE_CLOSED
				return my postActivityData(PROCESS_NAME_DEVICE_LIDSTATE, WINDOW_TITLE_DEVICE_LIDSTATE_CLOSED)
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


set CONFIG_CLIENT_CHECK_DEVICE_LIDSTATE to false
set CONFIG_SERVER_PORT to "9999"
set CONFIG_CLIENT_CHECK_INTERVAL_IN_SECONDS to 1

set PROCESS_NAME_ACTIVITY_TRACKER to "C.B.AT"

set PROCESS_NAME_SCREENSAVER to "D.SS"
set WINDOW_TITLE_SCREENSAVER_START to "1"
set WINDOW_TITLE_SCREENSAVER_END to "0"

set PROCESS_NAME_DEVICE_POWERSTATE to "D.PS"
set WINDOW_TITLE_DEVICE_POWERSTATE_AWAKE to "1"
set WINDOW_TITLE_DEVICE_POWERSTATE_ASLEEP to "0"

set PROCESS_NAME_DEVICE_LIDSTATE to "D.LS"
set WINDOW_TITLE_DEVICE_LIDSTATE_OPEN to "1"
set WINDOW_TITLE_DEVICE_LIDSTATE_CLOSED to "0"

set previousProcessName to ""
set previousWindowTitle to ""
set previousDevicePowerState to WINDOW_TITLE_DEVICE_POWERSTATE_AWAKE
set previousDeviceLidState to WINDOW_TITLE_DEVICE_LIDSTATE_OPEN

set mePath to POSIX path of ((path to me as text) & "::")
set projectPath to mePath & "../../"

my startServer()

repeat
	my trackActivity()
	delay(CONFIG_CLIENT_CHECK_INTERVAL_IN_SECONDS)
end repeat
