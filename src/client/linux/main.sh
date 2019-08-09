#!/bin/bash

RESULT=$(xprop -id $(xprop -root 32x '\t$0' _NET_ACTIVE_WINDOW | cut -f 2) WM_CLASS WM_NAME)
RESULT=$(echo $RESULT | sed 's/"//g')
IFS=', ' read -r -a array <<< "$RESULT"

APP_NAME=${array[3]}
WINDOW_TITLE="${array[6]}${array[7]}${array[8]}${array[9]}${array[10]}${array[11]}\ ${array[12]}\ ${array[13]}"

echo '{ "appName": "$APP_NAME", "appPath": "$APP_NAME", "windowTitle": "$WINDOW_TITLE" }'
