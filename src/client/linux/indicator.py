#!/usr/bin/env python3

import gi
gi.require_version('Gtk', '3.0')
gi.require_version('AppIndicator3', '0.1')

import os
import signal
import commands
from subprocess import call
from gi.repository import Gtk
from gi.repository import AppIndicator3 as AppIndicator

APPINDICATOR_ID = "barryels-activity-monitor"

item_help = ''
item_go_to_dashboard = ''
item_pause = ''
item_preferences = ''
item_quit = ''


def main():
    indicator = AppIndicator.Indicator.new(APPINDICATOR_ID, '/home/barryels/Projects/activity-tracker/src/client/linux/indicator-icon.svg', AppIndicator.IndicatorCategory.SYSTEM_SERVICES)
    indicator.set_status(AppIndicator.IndicatorStatus.ACTIVE)
    indicator.set_menu(build_menu())
    Gtk.main()

def build_menu():
    global item_toggle_trackpad
    global item_toggle_keyboard

    menu = Gtk.Menu()

    item_help = Gtk.MenuItem('Help...')
    item_help.connect('activate', show_help)
    menu.append(item_help)

    separator = Gtk.SeparatorMenuItem()
    menu.append(separator)

    item_go_to_dashboard = Gtk.MenuItem('Go to Dashboard...')
    item_go_to_dashboard.connect('activate', show_help)
    menu.append(item_go_to_dashboard)

    separator = Gtk.SeparatorMenuItem()
    menu.append(separator)

    item_pause = Gtk.MenuItem('Pause')
    item_pause.connect('activate', show_help)
    menu.append(item_pause)

    separator = Gtk.SeparatorMenuItem()
    menu.append(separator)

    item_preferences = Gtk.MenuItem('Preferences...')
    item_preferences.connect('activate', show_help)
    menu.append(item_preferences)

    separator = Gtk.SeparatorMenuItem()
    menu.append(separator)

    item_quit = Gtk.MenuItem('Quit Activity Tracker')
    item_quit.connect('activate', do_quit)
    menu.append(item_quit)

    menu.show_all()
    update_menu_items()

    return menu


def show_help(source):
    call(["xbacklight", "-inc", "20"])


def update_menu_items():
    # if get_trackpad_enabled_status() == '1':
    #     item_toggle_trackpad.get_child().set_text('Disable Trackpad')
    # else:
    #     item_toggle_trackpad.get_child().set_text('Enable Trackpad')

    # if get_keyboard_enabled_status() == '1':
    #     item_toggle_keyboard.get_child().set_text('Disable Keyboard')
    # else:
    #     item_toggle_keyboard.get_child().set_text('Enable Keyboard')
    return True


def do_quit(source):
    quit()
    return True


if __name__ == "__main__":
    #keyboard interrupt handler
    signal.signal(signal.SIGINT, signal.SIG_DFL)
    main()
