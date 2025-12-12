import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import PermissionsManager from "@/components/PermissionManager";


export default function RootLayout() {
  return (
    <Provider store={store}>
      <PermissionsManager />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </Provider>
  );
}
