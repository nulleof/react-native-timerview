# react-native-timerview

## Timer view for react-native

This component creates timer which starts from 00:00:00, uses custom interval of refreshing and can be paused or resumed again from the last value.

![Image of react-grid-view](timer.jpg)

### Installation
```bash
npm install --save react-native-timerview
```

### Properties
```
interval={100} // Time of timer cycle in ms
isPaused={false} // Initial pause state of timer
style={styles.textStyle} // This timer is a wrapper of react-native <Text> so this style is applying directly to Text object
//You can use additional properties of <Text> object
```

### Usage example

Import module into the project

```javascript
let TimerView = require('react-native-timerview');
```

Add TimerView to render() method

```javascript
<TimerView
    style={styles.timerStyle} // This style is for <Text> which is used in TimerView
    interval={100} // If you omit this, interval will be set as 100 ms
    isPaused={this.state.isPaused}/> //Boolean property. If state is changed, timer will start from last position
```

Change state of property isPaused for stop/resume timer

```javascript
this.setState({
  isPaused: true
});
```
