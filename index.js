'use strict';

import React, {Component} from "react";
import {
    Text,
    AppState
} from "react-native";
import FormatTime from "minutes-seconds-milliseconds";

class TimerView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            timeElapsed: 0,
            isPaused: false,
            tickInterval: props.interval || 100
        }
    }

    componentDidMount() {
        AppState.addEventListener('change', this._handleAppStateChange.bind(this));

        this.startTime = new Date();
        this.lastSavedTime = 0;

        this.interval = setInterval(() => {
                if(AppState.currentState === 'active' && !this.state.isPaused) {
            this.setState({
                timeElapsed: new Date() - this.startTime + this.lastSavedTime
            });
        }
    }, this.state.tickInterval);
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange.bind(this));
        clearInterval(this.interval);

        this.startTime = 0;
        this.lastSavedTime = 0;

        this.setState({
            timeElapsed: 0,
        });
    }

    _handleAppStateChange(currentAppState) {
        if(currentAppState === 'active') {
            this.setPauseState(false);
        } else {
            this.setPauseState(true);
        }
    }

    componentWillReceiveProps(nextProps) {
        if(typeof nextProps.isPaused === 'boolean') {
            this.setPauseState(nextProps.isPaused);
        }
    }

    setNativeProps(nativeProps) {
        if(typeof nativeProps.isPaused === 'boolean') {
            this.setPauseState(nativeProps.isPaused);
        }
    }

    setPauseState(pauseState) {
        this.setState({
            isPaused: pauseState,
        });

        if(pauseState) {
            this.lastSavedTime = this.state.timeElapsed;
        } else {
            this.startTime = new Date();
        }
    }

    render() {
        return (
            <Text {...this.props}>
        {FormatTime(this.state.timeElapsed)}
    </Text>
    );
    }
}

module.exports = TimerView;