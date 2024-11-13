import { Tabs } from 'expo-router';

export default function TabLayout() {
    return (
        <Tabs>
            <Tabs.Screen name="index" options={{ title: 'Inicio' }} />
            <Tabs.Screen name="conversor" options={{ title: 'Conversor' }} />
            <Tabs.Screen name="historic" options={{ title: 'Histórico' }} />
        </Tabs>
    );
}
