import React from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

type Props = {
    data: string[];
    itemSize: number;
    onPressItem: (uri: string) => void;
};

export function PhotoGrid({ data, itemSize, onPressItem }: Props) {
    return (
        <FlatList
            style={{ flex: 1 }}
            data={data}
            keyExtractor={(u) => u}
            numColumns={3}
            columnWrapperStyle={{
                paddingHorizontal: 16,
                justifyContent: "flex-start",
            }}
            contentContainerStyle={{ paddingVertical: 16 }}
            ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
            renderItem={({ item, index }) => (
                <TouchableOpacity
                    onPress={() => onPressItem(item)}
                    activeOpacity={0.8}
                >
                    <Animated.Image
                        source={{ uri: item }}
                        entering={FadeInDown.delay(index * 60).duration(220)}
                        style={{
                            width: itemSize,
                            height: itemSize,
                            borderRadius: 8,
                            marginRight: index % 3 === 2 ? 0 : 12,
                        }}
                    />
                </TouchableOpacity>
            )}
        />
    );
}
