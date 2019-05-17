import * as React from 'react';
import { Text, View } from 'react-native';
import { LinearGradient } from 'expo';

var curday;
var secTime;
var ticker;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      days: 0,
      hours: 0,
      mins: 0,
      secs: 0,
    };
  }

  getSeconds() {
    var nowDate = new Date();
    var dy = 0;
    var countertime = new Date(
      nowDate.getFullYear(),
      nowDate.getMonth(),
      nowDate.getDate(),
      0,
      0,
      0
    );

    var today = new Date().getDay();
    var hour = new Date().getHours();
    var minute = new Date().getMinutes();

    if (
      (today == 1 && hour >= 17) ||
      today == 2 ||
      today == 3 ||
      (today == 4 && hour < 2) ||
      (today == 4 && hour == 2 && minute < 37)
    ) {
      countertime = new Date(
        nowDate.getFullYear(),
        nowDate.getMonth(),
        nowDate.getDate(),
        2,
        37,
        0
      );
      dy = 4;
    }
    if (
      (today == 4 && hour == 2 && minute >= 37) ||
      (today == 4 && hour >= 3) ||
      today == 5 ||
      (today == 6 && hour < 14) ||
      (today == 6 && hour == 14 && minute < 54)
    ) {
      countertime = new Date(
        nowDate.getFullYear(),
        nowDate.getMonth(),
        nowDate.getDate(),
        14,
        54,
        0
      );
      dy = 6;
    }
    if (
      (today == 6 && hour == 14 && minute >= 54) ||
      (today == 6 && hour > 14) ||
      today == 0 ||
      (today == 1 && hour < 17)
    ) {
      countertime = new Date(
        nowDate.getFullYear(),
        nowDate.getMonth(),
        nowDate.getDate(),
        17,
        0,
        0
      );
      dy = 1;
    }

    var curtime = nowDate.getTime();
    var atime = countertime.getTime();
    var diff = parseInt((atime - curtime) / 1000);
    if (diff > 0) {
      curday = dy - nowDate.getDay();
    } else {
      curday = dy - nowDate.getDay() - 1;
    }
    if (curday < 0) {
      curday += 7;
    }
    if (diff <= 0) {
      diff += 86400 * 7;
    }
    this.startTimer(diff);
  }

  startTimer(secs) {
    secTime = parseInt(secs);
    ticker = setInterval(() => {
      this.tick();
    }, 1000);
    this.tick();
  }

  tick() {
    var secs = secTime;
    if (secs > 0) {
      secTime--;
    } else {
      clearInterval(ticker);
      this.getSeconds();
    }

    var days = Math.floor(secs / 86400);
    secs %= 86400;
    var hours = Math.floor(secs / 3600);
    secs %= 3600;
    var mins = Math.floor(secs / 60);
    secs %= 60;

    this.setState({
      days: curday,
      hours: hours,
      mins: mins,
      secs: secs,
    });
  }

  componentDidMount() {
    this.getSeconds();
  }

  render() {
    return (
      <View /*container*/
        style={{
          backgroundColor: '#353535',
          flex: 1,
          justifyContent: 'center',
        }}>
        <LinearGradient
          colors={['#222', '#333', '#333', '#222']}
          style={{ padding: 15, alignItems: 'center', borderRadius: 5 }}>
          <View /* clock */
            style={{
              height: 150,
              backgroundColor: 'transparent',
              flexDirection: 'row',
              alignItems: 'center',
              borderRadius: 4,
            }}>
            <View /* ticker */
              style={{
                backgroundColor: 'transparent',
                height: 100,
                borderRadius: 4,
                width: 70,
                marginLeft: 20,
                marginRight: 10,
              }}>
              <View /* digit*/
                style={{
                  backgroundColor: '#fff',
                  borderRadius: 4,
                  margin: 10,
                  width: 70,
                  height: 70,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 40,
                    fontWeight: 'bold',
                  }}>
                  {this.state.days}
                </Text>
              </View>
              <Text /* unit */
                style={{
                  textAlign: 'center',
                  color: '#f4731f',
                  fontWeight: 'bold',
                  fontSize: 15,
                  marginLeft: 20,
                }}>
                DAYS
              </Text>
            </View>
            <View /* ticker */
              style={{
                backgroundColor: 'transparent',
                height: 100,
                borderRadius: 4,
                width: 70,
                marginLeft: 10,
                marginRight: 10,
              }}>
              <View /* digit*/
                style={{
                  backgroundColor: '#fff',
                  borderRadius: 4,
                  margin: 10,
                  width: 70,
                  height: 70,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 40,
                    fontWeight: 'bold',
                  }}>
                  {this.state.hours}
                </Text>
              </View>
              <Text /* unit */
                style={{
                  textAlign: 'center',
                  color: '#f4731f',
                  fontWeight: 'bold',
                  fontSize: 15,
                  marginLeft: 15,
                }}>
                HOURS
              </Text>
            </View>
            <View /* ticker */
              style={{
                backgroundColor: 'transparent',
                height: 100,
                borderRadius: 4,
                width: 70,
                marginLeft: 10,
                marginRight: 10,
              }}>
              <View /* digit*/
                style={{
                  backgroundColor: '#fff',
                  borderRadius: 4,
                  margin: 10,
                  width: 70,
                  height: 70,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 40,
                    fontWeight: 'bold',
                  }}>
                  {this.state.mins}
                </Text>
              </View>
              <Text /* unit */
                style={{
                  textAlign: 'center',
                  color: '#f4731f',
                  fontWeight: 'bold',
                  fontSize: 15,
                  marginLeft: 20,
                }}>
                MINS
              </Text>
            </View>
            <View /* ticker */
              style={{
                backgroundColor: 'transparent',
                height: 100,
                borderRadius: 4,
                width: 70,
                marginLeft: 10,
                marginRight: 40,
              }}>
              <View /* digit*/
                style={{
                  backgroundColor: '#fff',
                  borderRadius: 4,
                  margin: 10,
                  width: 70,
                  height: 70,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 40,
                    fontWeight: 'bold',
                  }}>
                  {this.state.secs}
                </Text>
              </View>
              <Text /* unit */
                style={{
                  textAlign: 'center',
                  color: '#f4731f',
                  fontWeight: 'bold',
                  fontSize: 15,
                  marginLeft: 20,
                }}>
                SECS
              </Text>
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  }
}
