import React from 'react';
import { WebView } from 'react-native-webview';

const WebViewScreen = ({ route }) => {
    const { videoId } = route.params;

    return (
        <WebView
            source={{ uri: `https://www.youtube.com/embed/${videoId}` }}
            style={{ flex: 1 }}
        />
    );
};

export default WebViewScreen;