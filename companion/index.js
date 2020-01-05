import { me as companion } from "companion";
import * as messaging from "messaging";
import { settingsStorage } from "settings";

settingsStorage.onchange = function(evt) {
  update(evt.key, evt.newValue);
}

if (companion.launchReasons.settingsChanged) {
  update("color", settingsStorage.getItem("color"));
}

function update(key, val) {
  let data = {key: key, val: JSON.parse(val)};
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send(data);
  } else {
    console.log("No peerSocket connection");
  }
}