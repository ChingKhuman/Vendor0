/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { registerRootComponent } from "expo";
import 'react-native-gesture-handler';
// import * as Sentry from "@sentry/react-native";



AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerComponent(appName.toLowerCase(), () => App);
