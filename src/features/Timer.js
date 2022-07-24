import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform, Vibration } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useKeepAwake } from 'expo-keep-awake';
import { Countdown } from "../components/Countdown";
import { RoundedButton } from '../components/RoundedButton';
import { Timing } from './Timing';
import { spacing } from '../utils/sizes';
import { colors } from '../utils/colors';

const ONE_SECOND_IN_MS = 1000;
const PATTERN = [
    1 * ONE_SECOND_IN_MS,
    1 * ONE_SECOND_IN_MS,
    1 * ONE_SECOND_IN_MS,
    1 * ONE_SECOND_IN_MS,
    1 * ONE_SECOND_IN_MS,
];

export const Timer = ({ focusSubject, clearSubject, onTimerEnd }) => {
    useKeepAwake();
    
    const [isStarted, setIsStarted] = useState(false);
    const [progress, setProgress] = useState(1);
    const [minutes, setMinutes] = useState(0.05);

    const onEnd = (reset) => {
        Vibration.vibrate(PATTERN);

        /* Use setTimeout, because Rendering of Timer is not finished yet. Warning if more than one component is rendered.
         *
         * Warning: Cannot update a component (`Timer`) while rendering a different component (`Countdown`). To locate the bad setState()
         * call inside `Countdown`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render
         */
        setTimeout(() => {
            setIsStarted(false); // Renders Timer
            setProgress(1); // Renders Timer
            reset(); // Renders Countdown
            onTimerEnd(focusSubject); // Renders App (the whole app)
        }, 0);
    };

    return (
        <View style={styles.container}>
            <View style={styles.countdown}>
                <Countdown
                    minutes={minutes}
                    isPaused={!isStarted}
                    onProgress={setProgress}
                    onEnd={onEnd}
                />
                <View style={{ paddingTop: spacing.xxl }}>
                    <Text style={styles.title}>Focosing on:</Text>
                    <Text style={styles.task}>{focusSubject}</Text>
                </View>
            </View>

            <View style={{ paddingTop: spacing.sm }}>
                <ProgressBar
                    progress={progress}
                    color={colors.progressBar} 
                    style={{ height: spacing.sm }} 
                />
            </View>

            <View style={styles.timingWrapper}>
                <Timing onChangeTime={setMinutes} />
            </View>

            <View style={styles.buttonWrapper}>
                {!isStarted && (
                    <RoundedButton title="start" onPress={() => { setIsStarted(true); }} />
                )}
                {isStarted && (
                    <RoundedButton title="pause" onPress={() => { setIsStarted(false); }} />
                )}
            </View>

            <View style={styles.clearSubjectWrapper}>
                <RoundedButton
                    size={50}
                    title="-"
                    onPress={clearSubject}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container:  {
        flex: 1,
    },
    countdown: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    timingWrapper: {
        flex: 0.1,
        flexDirection: 'row',
        paddingTop: spacing.xxl,
    },
    buttonWrapper: {
        flex: 0.3,
        flexDirection: 'row',
        padding: spacing.md,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    clearSubjectWrapper: {
        flex: 0.1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    title: {
        color: colors.white,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    task: {
        color: colors.white,
        textAlign: 'center'
    }
});
