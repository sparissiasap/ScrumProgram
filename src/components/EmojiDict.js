import React, { Component } from 'react';
import { Text, FlatList } from 'react-native';
import { styles as styles } from '../style/styles';

class EmojiDict extends Component {
    state = {
        '😃': '😃 Smiley',
        '🚀': '🚀 Rocket',
        '⚛️': '⚛️ Atom Symbol'
    };

    render() {
        return (
            <FlatList
                contentContainerStyle={styles.container}
                data={[
                    { key: '😃', value: '😃 Smiley' },
                    { key: '🚀', value: '🚀 Rocket' },
                    { key: '⚛️', value: '⚛️ Atom Symbol' }
                ]}
                renderItem={({ item }) => <Text>{item.value}</Text>}
            />
        );
    }
}

export default EmojiDict;