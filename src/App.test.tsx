import { render, screen } from "@testing-library/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App";

describe("App Component", () => {
    test("renders AppRouter within GoogleOAuthProvider", () => {
        render(
            <GoogleOAuthProvider clientId="test-client-id"><App /></GoogleOAuthProvider>
        );
        expect(screen.getByRole("presentation")).toBeInTheDocument();
    });
});
