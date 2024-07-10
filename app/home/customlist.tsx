import { FlatList, Text, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useCallback, useState } from 'react';

// You can import supported modules from npm
import { List, Searchbar, PaperProvider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';


type Entity = {
    "entity_id": string,
    "friendly_name": string,
}

const mydata = [
    {
        "entity_id": "automation.enter_of_leave_zone",
        "friendly_name": "enter of leave zone"
    },
    {
        "entity_id": "automation.garbage_days",
        "friendly_name": "garbage days"
    },
    {
        "entity_id": "automation.google_tv_channels",
        "friendly_name": "google tv  channels"
    },
    {
        "entity_id": "automation.hasip",
        "friendly_name": "hasip"
    },
    {
        "entity_id": "automation.homeminigarbage",
        "friendly_name": "homeminigarbage"
    },
    {
        "entity_id": "automation.iphone_battery_level_30",
        "friendly_name": "iphone battery level 30"
    },
    {
        "entity_id": "automation.localdeck",
        "friendly_name": "localdeck"
    },
    {
        "entity_id": "automation.meaningoflife",
        "friendly_name": "meaningoflife"
    },
    {
        "entity_id": "automation.rhasspy_garage_door",
        "friendly_name": "rhasspy garage door"
    },
    {
        "entity_id": "automation.rhasspy_get_time",
        "friendly_name": "Rhasspy get time"
    },
    {
        "entity_id": "automation.testassistspeech",
        "friendly_name": "TestAssistSpeech"
    },
    {
        "entity_id": "automation.testcalendar",
        "friendly_name": "testcalendar"
    },
    {
        "entity_id": "binary_sensor.192_168_20_23_call_in_progress",
        "friendly_name": "192.168.20.23 Call in progress"
    },
    {
        "entity_id": "binary_sensor.192_168_20_25_call_in_progress",
        "friendly_name": "192.168.20.25 Call in progress"
    },
    {
        "entity_id": "binary_sensor.192_168_20_67_call_in_progress",
        "friendly_name": "192.168.20.67 Call in progress"
    },
    {
        "entity_id": "binary_sensor.entity_state_cli_test",
        "friendly_name": "binary_sensor.entity_state_cli_test"
    },
    {
        "entity_id": "binary_sensor.iphone_focus",
        "friendly_name": "iPhone Focus"
    },
    {
        "entity_id": "binary_sensor.moomoo",
        "friendly_name": "moomoo"
    },
    {
        "entity_id": "binary_sensor.remotetester_fakesignal",
        "friendly_name": "remotetester FakeSignal"
    },
    {
        "entity_id": "binary_sensor.rpi_power_status",
        "friendly_name": "RPi Power status"
    },
    {
        "entity_id": "binary_sensor.sm_a205yn_high_accuracy_mode",
        "friendly_name": "SM-A205YN High accuracy mode"
    },
    {
        "entity_id": "binary_sensor.sm_a205yn_is_charging",
        "friendly_name": "SM-A205YN Is charging"
    },
    {
        "entity_id": "binary_sensor.updater",
        "friendly_name": "Updater"
    },
    {
        "entity_id": "binary_sensor.workday_sensor",
        "friendly_name": "Workday Sensor"
    },
    {
        "entity_id": "button.google_assistant_synchronise_devices",
        "friendly_name": "Google Assistant Synchronise devices"
    },
    {
        "entity_id": "button.remotetester_template_button",
        "friendly_name": "remotetester Template Button"
    },
    {
        "entity_id": "calendar.garbagedays",
        "friendly_name": "garbagedays"
    },
    {
        "entity_id": "calendar.testcalendar",
        "friendly_name": "testcalendar"
    },
    {
        "entity_id": "camera.my_meteoblue_com",
        "friendly_name": "my_meteoblue_com"
    },
    {
        "entity_id": "camera.pendulum",
        "friendly_name": "pendulum"
    },
    {
        "entity_id": "conversation.home_assistant",
        "friendly_name": "Home Assistant"
    },
    {
        "entity_id": "device_tracker.iphone",
        "friendly_name": "iPhone"
    },
    {
        "entity_id": "device_tracker.sm_a205yn",
        "friendly_name": "SM-A205YN"
    },
    {
        "entity_id": "input_boolean.boo",
        "friendly_name": "Boo"
    },
    {
        "entity_id": "input_boolean.garbagetoggle",
        "friendly_name": "garbagetoggle"
    },
    {
        "entity_id": "input_boolean.moo",
        "friendly_name": "moo"
    },
    {
        "entity_id": "input_boolean.yesno",
        "friendly_name": "yesno"
    },
    {
        "entity_id": "input_button.firstbutton",
        "friendly_name": "firstbutton"
    },
    {
        "entity_id": "input_button.seven",
        "friendly_name": "Seven"
    },
    {
        "entity_id": "input_button.shemaroo",
        "friendly_name": "Shemaroo"
    },
    {
        "entity_id": "input_number.meaningoflife",
        "friendly_name": "meaningoflife"
    },
    {
        "entity_id": "input_select.chromecasts",
        "friendly_name": "chromecasts"
    },
    {
        "entity_id": "input_select.next_garbage_bin",
        "friendly_name": "Next Garbage Bin"
    },
    {
        "entity_id": "input_text.age_temperature",
        "friendly_name": "age_temperature"
    },
    {
        "entity_id": "input_text.dummytext",
        "friendly_name": "dummytext"
    },
    {
        "entity_id": "input_text.outside_domain_access",
        "friendly_name": "outside-domain-access"
    },
    {
        "entity_id": "input_text.radio_mirchi_retro",
        "friendly_name": "radio mirchi retro"
    },
    {
        "entity_id": "input_text.radio_rythm_metadata_title",
        "friendly_name": "radio rythm metadata title"
    },
    {
        "entity_id": "input_text.radiorythm",
        "friendly_name": "radiorythm"
    },
    {
        "entity_id": "input_text.radiorythmsources",
        "friendly_name": "radiorythmsources"
    },
    {
        "entity_id": "input_text.rain_prob",
        "friendly_name": "Rain Prob"
    },
    {
        "entity_id": "input_text.temp",
        "friendly_name": "Temp"
    },
    {
        "entity_id": "input_text.wind",
        "friendly_name": "Wind"
    },
    {
        "entity_id": "light.all_lights",
        "friendly_name": "all_lights"
    },
    {
        "entity_id": "light.mirabella_2_light",
        "friendly_name": "Kitchen Light"
    },
    {
        "entity_id": "light.rgbw_e27_01",
        "friendly_name": "Rumpus Light"
    },
    {
        "entity_id": "media_player.android_tv",
        "friendly_name": "Android TV 192.168.20.20"
    },
    {
        "entity_id": "media_player.kdl_43w750d",
        "friendly_name": "Lounge TV"
    },
    {
        "entity_id": "media_player.living_room_tv",
        "friendly_name": "Living Room TV"
    },
    {
        "entity_id": "media_player.living_room_tv_2",
        "friendly_name": "Living Room TV"
    },
    {
        "entity_id": "media_player.living_room_tv_3",
        "friendly_name": "Living Room TV"
    },
    {
        "entity_id": "media_player.mopidy",
        "friendly_name": "mopidy"
    },
    {
        "entity_id": "media_player.rumpus_room_speaker",
        "friendly_name": "Rumpus room Speaker"
    },
    {
        "entity_id": "media_player.rumpus_room_speaker_2",
        "friendly_name": "Rumpus room Speaker"
    },
    {
        "entity_id": "person.aruna",
        "friendly_name": "Aruna"
    },
    {
        "entity_id": "person.boo",
        "friendly_name": "boo"
    },
    {
        "entity_id": "person.mohan",
        "friendly_name": "Mohan"
    },
    {
        "entity_id": "proximity.home",
        "friendly_name": "home"
    },
    {
        "entity_id": "proximity.home2",
        "friendly_name": "home2"
    },
    {
        "entity_id": "remote.android_tv_192_168_20_20",
        "friendly_name": "Android TV 192.168.20.20"
    },
    {
        "entity_id": "remote.living_room_tv",
        "friendly_name": "Living Room TV"
    },
    {
        "entity_id": "scene.garbage",
        "friendly_name": "garbage"
    },
    {
        "entity_id": "script.googletv_change_channel",
        "friendly_name": "googletv_change_channel"
    },
    {
        "entity_id": "script.googletv_downpress",
        "friendly_name": "googletv_downpress"
    },
    {
        "entity_id": "script.lmsplay",
        "friendly_name": "lmsplay"
    },
    {
        "entity_id": "script.load_players_button_clicked",
        "friendly_name": "nodered-event"
    },
    {
        "entity_id": "script.mute_google_tv",
        "friendly_name": "mute google tv"
    },
    {
        "entity_id": "script.netflix_google_tv",
        "friendly_name": "netflix google tv"
    },
    {
        "entity_id": "script.play_icecast_stream_on_google_home_mini",
        "friendly_name": "play icecast stream on google home mini"
    },
    {
        "entity_id": "script.play_mirchi_hindi_from_icecast",
        "friendly_name": "play mirchi retro from icecast"
    },
    {
        "entity_id": "script.play_radio_haanji",
        "friendly_name": "play radio stream from icecast"
    },
    {
        "entity_id": "script.send_message_to_google_home_mini",
        "friendly_name": "send message to google home mini"
    },
    {
        "entity_id": "script.test",
        "friendly_name": "test"
    },
    {
        "entity_id": "script.testcallingfromttgo",
        "friendly_name": "testCallingFromTTGO"
    },
    {
        "entity_id": "script.weatherhourly",
        "friendly_name": "weatherhourly"
    },
    {
        "entity_id": "script.whichbin",
        "friendly_name": "whichbin"
    },
    {
        "entity_id": "script.youtube_google_tv",
        "friendly_name": "youtube google tv"
    },
    {
        "entity_id": "select.192_168_20_23_assist_pipeline",
        "friendly_name": "192.168.20.23 Assist pipeline"
    },
    {
        "entity_id": "select.192_168_20_23_finished_speaking_detection",
        "friendly_name": "192.168.20.23 Finished speaking detection"
    },
    {
        "entity_id": "select.192_168_20_25_assist_pipeline",
        "friendly_name": "192.168.20.25 Assist pipeline"
    },
    {
        "entity_id": "select.192_168_20_25_finished_speaking_detection",
        "friendly_name": "192.168.20.25 Finished speaking detection"
    },
    {
        "entity_id": "select.192_168_20_67_assist_pipeline",
        "friendly_name": "192.168.20.67 Assist pipeline"
    },
    {
        "entity_id": "select.192_168_20_67_finished_speaking_detection",
        "friendly_name": "192.168.20.67 Finished speaking detection"
    },
    {
        "entity_id": "select.dummy_menu",
        "friendly_name": "Dummy Menu"
    },
    {
        "entity_id": "select.lights_off_menu",
        "friendly_name": "Lights off Menu"
    },
    {
        "entity_id": "select.lights_on_entities",
        "friendly_name": "Lights on entities"
    },
    {
        "entity_id": "select.lights_on_menu",
        "friendly_name": "Lights on Menu"
    },
    {
        "entity_id": "select.main_menu",
        "friendly_name": "Main Menu"
    },
    {
        "entity_id": "sensor.battery_percent",
        "friendly_name": "Battery Percent"
    },
    {
        "entity_id": "sensor.cert_expiry_timestamp_raspberrypisig_com",
        "friendly_name": "raspberrypisig.com Cert expiry"
    },
    {
        "entity_id": "sensor.days_until_next_holiday",
        "friendly_name": "Days until next holiday"
    },
    {
        "entity_id": "sensor.endeavour_hills_rain_chance_0",
        "friendly_name": "Endeavour Hills Rain Chance 0"
    },
    {
        "entity_id": "sensor.endeavour_hills_rain_chance_1",
        "friendly_name": "Endeavour Hills Rain Chance 1"
    },
    {
        "entity_id": "sensor.endeavour_hills_rain_chance_2",
        "friendly_name": "Endeavour Hills Rain Chance 2"
    },
    {
        "entity_id": "sensor.endeavour_hills_temp_max_0",
        "friendly_name": "Endeavour Hills Temp Max 0"
    },
    {
        "entity_id": "sensor.endeavour_hills_temp_max_1",
        "friendly_name": "Endeavour Hills Temp Max 1"
    },
    {
        "entity_id": "sensor.endeavour_hills_temp_max_2",
        "friendly_name": "Endeavour Hills Temp Max 2"
    },
    {
        "entity_id": "sensor.endeavour_hills_temp_min_0",
        "friendly_name": "Endeavour Hills Temp Min 0"
    },
    {
        "entity_id": "sensor.endeavour_hills_temp_min_1",
        "friendly_name": "Endeavour Hills Temp Min 1"
    },
    {
        "entity_id": "sensor.endeavour_hills_temp_min_2",
        "friendly_name": "Endeavour Hills Temp Min 2"
    },
    {
        "entity_id": "sensor.hacs",
        "friendly_name": "hacs"
    },
    {
        "entity_id": "sensor.home_2_nearest_device",
        "friendly_name": "Home 2 Nearest device"
    },
    {
        "entity_id": "sensor.home_2_nearest_direction_of_travel",
        "friendly_name": "Home 2 Nearest direction of travel"
    },
    {
        "entity_id": "sensor.home_2_nearest_distance",
        "friendly_name": "Home 2 Nearest distance"
    },
    {
        "entity_id": "sensor.home_2_sm_a205yn_direction_of_travel",
        "friendly_name": "Home 2 SM-A205YN Direction of travel"
    },
    {
        "entity_id": "sensor.home_2_sm_a205yn_distance",
        "friendly_name": "Home 2 SM-A205YN Distance"
    },
    {
        "entity_id": "sensor.home_iphone_direction_of_travel",
        "friendly_name": "Home iPhone Direction of travel"
    },
    {
        "entity_id": "sensor.home_iphone_distance",
        "friendly_name": "Home iPhone Distance"
    },
    {
        "entity_id": "sensor.home_nearest_device",
        "friendly_name": "Home Nearest device"
    },
    {
        "entity_id": "sensor.home_nearest_direction_of_travel",
        "friendly_name": "Home Nearest direction of travel"
    },
    {
        "entity_id": "sensor.home_nearest_distance",
        "friendly_name": "Home Nearest distance"
    },
    {
        "entity_id": "sensor.iphone_activity",
        "friendly_name": "iPhone Activity"
    },
    {
        "entity_id": "sensor.iphone_average_active_pace",
        "friendly_name": "iPhone Average Active Pace"
    },
    {
        "entity_id": "sensor.iphone_battery_level",
        "friendly_name": "iPhone Battery Level"
    },
    {
        "entity_id": "sensor.iphone_battery_state",
        "friendly_name": "iPhone Battery State"
    },
    {
        "entity_id": "sensor.iphone_bssid",
        "friendly_name": "iPhone BSSID"
    },
    {
        "entity_id": "sensor.iphone_connection_type",
        "friendly_name": "iPhone Connection Type"
    },
    {
        "entity_id": "sensor.iphone_distance",
        "friendly_name": "iPhone Distance"
    },
    {
        "entity_id": "sensor.iphone_floors_ascended",
        "friendly_name": "iPhone Floors Ascended"
    },
    {
        "entity_id": "sensor.iphone_floors_descended",
        "friendly_name": "iPhone Floors Descended"
    },
    {
        "entity_id": "sensor.iphone_geocoded_location",
        "friendly_name": "iPhone Geocoded Location"
    },
    {
        "entity_id": "sensor.iphone_last_update_trigger",
        "friendly_name": "iPhone Last Update Trigger"
    },
    {
        "entity_id": "sensor.iphone_sim_1",
        "friendly_name": "iPhone SIM 1"
    },
    {
        "entity_id": "sensor.iphone_sim_2",
        "friendly_name": "iPhone SIM 2"
    },
    {
        "entity_id": "sensor.iphone_ssid",
        "friendly_name": "iPhone SSID"
    },
    {
        "entity_id": "sensor.iphone_steps",
        "friendly_name": "iPhone Steps"
    },
    {
        "entity_id": "sensor.iphone_storage",
        "friendly_name": "iPhone Storage"
    },
    {
        "entity_id": "sensor.lms_albums",
        "friendly_name": "sensor.lms_albums"
    },
    {
        "entity_id": "sensor.lms_artists",
        "friendly_name": "sensor.lms_artists"
    },
    {
        "entity_id": "sensor.lms_duration",
        "friendly_name": "sensor.lms_duration"
    },
    {
        "entity_id": "sensor.lms_genres",
        "friendly_name": "sensor.lms_genres"
    },
    {
        "entity_id": "sensor.lms_players",
        "friendly_name": "sensor.lms_players"
    },
    {
        "entity_id": "sensor.lms_songs",
        "friendly_name": "sensor.lms_songs"
    },
    {
        "entity_id": "sensor.next_blue_bin_day",
        "friendly_name": "Next Blue Bin Day"
    },
    {
        "entity_id": "sensor.next_holiday",
        "friendly_name": "Next Holiday"
    },
    {
        "entity_id": "sensor.next_purple_bin_day",
        "friendly_name": "Next Purple Bin Day"
    },
    {
        "entity_id": "sensor.raspberrypisig_com_created",
        "friendly_name": "raspberrypisig.com Created"
    },
    {
        "entity_id": "sensor.raspberrypisig_com_days_until_expiration",
        "friendly_name": "raspberrypisig.com Days until expiration"
    },
    {
        "entity_id": "sensor.raspberrypisig_com_expires",
        "friendly_name": "raspberrypisig.com Expires"
    },
    {
        "entity_id": "sensor.raspberrypisig_com_last_updated",
        "friendly_name": "raspberrypisig.com Last updated"
    },
    {
        "entity_id": "sensor.scoresby_humidity",
        "friendly_name": "Scoresby Humidity"
    },
    {
        "entity_id": "sensor.scoresby_rain_since_9am",
        "friendly_name": "Scoresby Rain Since 9Am"
    },
    {
        "entity_id": "sensor.scoresby_temp",
        "friendly_name": "Scoresby Temp"
    },
    {
        "entity_id": "sensor.scoresby_temp_feels_like",
        "friendly_name": "Scoresby Temp Feels Like"
    },
    {
        "entity_id": "sensor.sm_a205yn_battery_health",
        "friendly_name": "SM-A205YN Battery health"
    },
    {
        "entity_id": "sensor.sm_a205yn_battery_level",
        "friendly_name": "SM-A205YN Battery level"
    },
    {
        "entity_id": "sensor.sm_a205yn_battery_power",
        "friendly_name": "SM-A205YN Battery power"
    },
    {
        "entity_id": "sensor.sm_a205yn_battery_state",
        "friendly_name": "SM-A205YN Battery state"
    },
    {
        "entity_id": "sensor.sm_a205yn_battery_temperature",
        "friendly_name": "SM-A205YN Battery temperature"
    },
    {
        "entity_id": "sensor.sm_a205yn_charger_type",
        "friendly_name": "SM-A205YN Charger type"
    },
    {
        "entity_id": "sensor.sm_a205yn_detected_activity",
        "friendly_name": "SM-A205YN Detected activity"
    },
    {
        "entity_id": "sensor.sm_a205yn_geocoded_location",
        "friendly_name": "SM-A205YN Geocoded location"
    },
    {
        "entity_id": "sensor.sm_a205yn_high_accuracy_update_interval",
        "friendly_name": "SM-A205YN High accuracy update interval"
    },
    {
        "entity_id": "sensor.sm_a205yn_next_alarm",
        "friendly_name": "SM-A205YN Next alarm"
    },
    {
        "entity_id": "sensor.sm_a205yn_sleep_confidence",
        "friendly_name": "SM-A205YN Sleep confidence"
    },
    {
        "entity_id": "sensor.smartplug1_current",
        "friendly_name": "SmartPlug1 Current"
    },
    {
        "entity_id": "sensor.smartplug1_power",
        "friendly_name": "SmartPlug1 Power"
    },
    {
        "entity_id": "sensor.smartplug1_voltage",
        "friendly_name": "SmartPlug1 Voltage"
    },
    {
        "entity_id": "sensor.sun_next_dawn",
        "friendly_name": "Sun Next dawn"
    },
    {
        "entity_id": "sensor.sun_next_dusk",
        "friendly_name": "Sun Next dusk"
    },
    {
        "entity_id": "sensor.sun_next_midnight",
        "friendly_name": "Sun Next midnight"
    },
    {
        "entity_id": "sensor.sun_next_noon",
        "friendly_name": "Sun Next noon"
    },
    {
        "entity_id": "sensor.sun_next_rising",
        "friendly_name": "Sun Next rising"
    },
    {
        "entity_id": "sensor.sun_next_setting",
        "friendly_name": "Sun Next setting"
    },
    {
        "entity_id": "sensor.system_monitor_disk_free",
        "friendly_name": "System Monitor Disk free /"
    },
    {
        "entity_id": "sensor.theage_48_hour_forecast",
        "friendly_name": "TheAge 48 hour Forecast"
    },
    {
        "entity_id": "stt.faster_whisper",
        "friendly_name": "faster-whisper"
    },
    {
        "entity_id": "sun.sun",
        "friendly_name": "Sun"
    },
    {
        "entity_id": "switch.192_168_20_23_allow_calls",
        "friendly_name": "192.168.20.23 Allow calls"
    },
    {
        "entity_id": "switch.192_168_20_25_allow_calls",
        "friendly_name": "192.168.20.25 Allow calls"
    },
    {
        "entity_id": "switch.192_168_20_67_allow_calls",
        "friendly_name": "192.168.20.67 Allow calls"
    },
    {
        "entity_id": "switch.sleep_toggle",
        "friendly_name": "Sleep Toggle"
    },
    {
        "entity_id": "switch.smartplug1_switch",
        "friendly_name": "SmartPlug1 Switch"
    },
    {
        "entity_id": "tts.google_en_com_au",
        "friendly_name": "Google en com.au"
    },
    {
        "entity_id": "tts.piper",
        "friendly_name": "piper"
    },
    {
        "entity_id": "update.duck_dns_update",
        "friendly_name": "Duck DNS Update"
    },
    {
        "entity_id": "update.esphome_update",
        "friendly_name": "ESPHome Update"
    },
    {
        "entity_id": "update.file_editor_update",
        "friendly_name": "File editor Update"
    },
    {
        "entity_id": "update.grafana_update",
        "friendly_name": "Grafana Update"
    },
    {
        "entity_id": "update.ha_sip_update",
        "friendly_name": "ha-sip Update"
    },
    {
        "entity_id": "update.home_assistant_core_update",
        "friendly_name": "Home Assistant Core Update"
    },
    {
        "entity_id": "update.home_assistant_supervisor_update",
        "friendly_name": "Home Assistant Supervisor Update"
    },
    {
        "entity_id": "update.icecast_update",
        "friendly_name": "Icecast Update"
    },
    {
        "entity_id": "update.localdeck_configurator_update",
        "friendly_name": "LocalDeck Configurator Update"
    },
    {
        "entity_id": "update.logitech_media_server_update",
        "friendly_name": "LMS (Formerly Logitech Media Server) Update"
    },
    {
        "entity_id": "update.mariadb_update",
        "friendly_name": "MariaDB Update"
    },
    {
        "entity_id": "update.mirabella_coolwhite_firmware",
        "friendly_name": "Firmware"
    },
    {
        "entity_id": "update.mirabella_rgbw_firmware",
        "friendly_name": "Firmware"
    },
    {
        "entity_id": "update.music_assistant_update",
        "friendly_name": "Music Assistant Update"
    },
    {
        "entity_id": "update.nginx_home_assistant_ssl_proxy_update",
        "friendly_name": "NGINX Home Assistant SSL proxy Update"
    },
    {
        "entity_id": "update.node_red_update",
        "friendly_name": "Node-RED Update"
    },
    {
        "entity_id": "update.piper_update",
        "friendly_name": "Piper Update"
    },
    {
        "entity_id": "update.remotetester_firmware",
        "friendly_name": "Firmware"
    },
    {
        "entity_id": "update.rhasspy_assistant_update",
        "friendly_name": "Rhasspy Assistant Update"
    },
    {
        "entity_id": "update.samba_share_update",
        "friendly_name": "Samba share Update"
    },
    {
        "entity_id": "update.studio_code_server_update",
        "friendly_name": "Studio Code Server Update"
    },
    {
        "entity_id": "update.terminal_ssh_update",
        "friendly_name": "Terminal & SSH Update"
    },
    {
        "entity_id": "update.whisper_update",
        "friendly_name": "Whisper Update"
    },
    {
        "entity_id": "weather.endeavour_hills",
        "friendly_name": "Endeavour Hills"
    },
    {
        "entity_id": "weather.endeavour_hills_hourly",
        "friendly_name": "Endeavour Hills Hourly"
    },
    {
        "entity_id": "zone.bunnings",
        "friendly_name": "bunnings"
    },
    {
        "entity_id": "zone.county_court",
        "friendly_name": "county court"
    },
    {
        "entity_id": "zone.endeavour_hills_shopping_centre",
        "friendly_name": "endeavour hills shopping centre"
    },
    {
        "entity_id": "zone.hallam_square",
        "friendly_name": "hallam square"
    },
    {
        "entity_id": "zone.home",
        "friendly_name": "Home"
    },
    {
        "entity_id": "zone.iyers_vegetarian_restaurant",
        "friendly_name": "iyers vegetarian restaurant"
    },
    {
        "entity_id": "zone.jacques_road",
        "friendly_name": "jacques road"
    },
    {
        "entity_id": "zone.lakshmi_vilas",
        "friendly_name": "lakshmi vilas"
    },
    {
        "entity_id": "zone.melbpc",
        "friendly_name": "Melbourne PC User Group Moorabbin"
    }
];

export default function App() {

    const renderItem = useCallback(({ item }: { item: Entity }) => (

        <List.Item
            title={item.entity_id}
            description={item.friendly_name}
            left={props => <MaterialCommunityIcons name="play" size={24} style={styles.icons} color="black" />}
            onPress={
                (e) => setSearchQuery(item.entity_id)
            }
        />

    ), []);

    const filterData = useCallback((query: string) => {
        const q = query.toLowerCase();
        return mydata.filter((item) => item.entity_id.includes(q) || item.friendly_name.includes(q)).slice(0, 30);
    }, []);

    const [searchQuery, setSearchQuery] = useState('');
    const [showAutocomplete, setShowAutocomplete] = useState(false);

    return (

        <SafeAreaView style={styles.container}>
            <Searchbar
                placeholder="Search Entity"
                onChangeText={(text) => {
                    setSearchQuery(text);
                    if (text.length === 0) {
                        setShowAutocomplete(false);
                    }

                    else {
                        setShowAutocomplete(true);
                    }
                }}
                value={searchQuery}
            />
            <FlatList style={styles.paragraph}
                data={showAutocomplete ? filterData(searchQuery) : mydata}
                renderItem={renderItem}
                keyExtractor={item => item.entity_id}
                keyboardShouldPersistTaps='handled'
            //initialNumToRender={15}
            //windowSize={30}
            //getItemLayout={(data, index) => (
            // {length: 70, offset: 70 * index, index}
            //)}
            />
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
        padding: 8,
        marginTop: 40,
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    icons: {
        marginTop: 15,
        paddingRight: 10,

    }
});
