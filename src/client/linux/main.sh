#!/bin/bash

CONFIG_SERVER_PORT='9999'
CONFIG_CLIENT_CHECK_INTERVAL_IN_SECONDS='1'
CONFIG_CLIENT_CHECK_DEVICE_LIDSTATE=''

PROCESS_NAME_SCREENSAVER=''
WINDOW_TITLE_SCREENSAVER_START=''
WINDOW_TITLE_SCREENSAVER_END=''
PROCESS_NAME_DEVICE_POWERSTATE=''
WINDOW_TITLE_DEVICE_POWERSTATE_AWAKE=''
WINDOW_TITLE_DEVICE_POWERSTATE_ASLEEP=''

PROCESS_NAME_DEVICE_LIDSTATE=''
WINDOW_TITLE_DEVICE_LIDSTATE_OPEN=''
WINDOW_TITLE_DEVICE_LIDSTATE_CLOSED=''

PROCESS_NAME_ACTIVITY_TRACKER=''
RESULT=''

previousProcessName=''
previousDevicePowerState=''
previousDeviceLidState=''

mePath=''
projectPath=''
serverPath=''


get_path_to_me() {
  echo "$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
}


get_active_window_title() {
	while [ 1 ]
	do
	# WINDOW_ID=$(xprop -root 32x '\t$0' _NET_ACTIVE_WINDOW | cut -f 2)
	# RESULT=$(xprop -id $(xprop -root 32x '\t$0' _NET_ACTIVE_WINDOW | cut -f 2) WM_CLASS WM_NAME)

	RESULT=$(xprop -id $(xprop -root 32x '\t$0' _NET_ACTIVE_WINDOW | cut -f 2) WM_CLASS WM_NAME)

	# WM_APP=$(xprop -id ${WINDOW_ID} WM_CLASS)
	# WM_NAME=$(xprop -id ${WINDOW_ID} WM_NAME)
	# WM_APP=`expr "$RESULT" : '\(.*\)'`
	# WM_APP=`expr "$WM_APP" : '\(, .*\)'`


	RESULT=$(echo $RESULT | sed 's/"//g')
	# RESULT=$(echo $RESULT | sed 's/ /\%20/g')
	# RESULT=$(echo $RESULT | sed 's/(WM_CLASS|WM_NAME)(\(\w+\)\s=\s)/`/g')
	IFS=', ' read -r -a array <<< "$RESULT"

	APP_NAME=${array[3]}
	$WINDOW_TITLE=''

	# for i in "${!foo[@]}"; do
	# printf "%s\t%s\n" "$i" "${foo[$i]}"
	# done


	# for i in "${array[@]}"
	# do
		# WINDOW_TITLE=$WINDOW_TITLE$i
	# done
	WINDOW_TITLE="${array[6]}|${array[7]}|${array[8]}|${array[9]}|${array[10]}|${array[11]}|${array[12]}|${array[13]}|${array[14]}...${#array[@]}"
	# WINDOW_TITLE="${array[6]}${array[7]}${array[8]}${array[9]}${array[10]}${array[11]}\ ${array[12]}\ ${array[13]}"
	# WINDOW_TITLE=${#array[@]}

	post_activity_data $APP_NAME $WINDOW_TITLE

	sleep ${CONFIG_CLIENT_CHECK_INTERVAL_IN_SECONDS}

	done
}

post_activity_data() {
	# echo $("curl -X POST 'http://localhost:$CONFIG_SERVER_PORT/activity?q=$RESULT'")
	echo $(curl -X POST http://localhost:$CONFIG_SERVER_PORT/activity?a=$1\&w=$2)
	# echo $(curl -X POST -H 'Content-Type: application/json' -d '{"a":"$1","w":"$2"}' http://localhost:$CONFIG_SERVER_PORT/activity)
	# echo $(curl -X POST --data-urlencode "q=$1" http://localhost:$CONFIG_SERVER_PORT/activity)
	# echo $2
	# echo $(curl -X POST -F data=$RESULT http://localhost:$CONFIG_SERVER_PORT/activity)
}


startServer() {
	serverPath="$(get_path_to_me)/../../server/index.js"
	# $(node '${serverPath}' > /dev/null 2>&1 &)
	# echo $(node ${serverPath})
}


startServer & get_active_window_title
