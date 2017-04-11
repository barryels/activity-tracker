#!/bin/bash

CONFIG_SERVER_PORT='9999'
CONFIG_CLIENT_CHECK_INTERVAL_IN_SECONDS='1'
CONFIG_CLIENT_CHECK_DEVICE_LIDSTATE=''

PROCESS_NAME_SCREENSAVER='D.SS'
WINDOW_TITLE_SCREENSAVER_ACTIVE='1'

PROCESS_NAME_ACTIVITY_TRACKER=''
RESULT=''

mePath=''
projectPath=''
serverPath=''


get_path_to_me() {
  echo "$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
}


get_active_app_and_window_title() {
	local WINDOW_TITLE=''

	while true
	do
		RESULT=$(xprop -id $(xprop -root 32x '\t$0' _NET_ACTIVE_WINDOW | cut -f 2) WM_CLASS WM_NAME)
		RESULT=$(echo $RESULT | sed 's/"//g')
		IFS=', ' read -r -a array <<< "$RESULT"

		APP_NAME=${array[3]}
		WINDOW_TITLE="${array[6]}${array[7]}${array[8]}${array[9]}${array[10]}${array[11]}\ ${array[12]}\ ${array[13]}"

		if [ $(is_screen_locked) -eq 1 ]
		then
			post_activity_data $PROCESS_NAME_SCREENSAVER $WINDOW_TITLE_SCREENSAVER_ACTIVE
		else
			post_activity_data $APP_NAME $WINDOW_TITLE
		fi

		sleep ${CONFIG_CLIENT_CHECK_INTERVAL_IN_SECONDS}
	done
}


start_indicator(){
	$(python $(get_path_to_me)/indicator.py)
}


is_screen_locked(){
	echo $(pgrep -cf lockscreen-mode)
}


post_activity_data() {
	$(echo "$1 $2")
	$(curl -s -X POST http://localhost:$CONFIG_SERVER_PORT/activity?a=$1\&w=$2)
}


startServer() {
	# serverPath="$(get_path_to_me)/../../server/index.js"
	# echo ${serverPath}
	# $(cd $(get_path_to_me))
	# $(echo pwd)
	# $(node ${serverPath})
	$(node "./src/server/index.js")
}


# startServer & start_indicator & get_active_app_and_window_title
startServer & get_active_app_and_window_title
