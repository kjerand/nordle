import ExpoModulesCore
import GameKit
import UIKit

public class ExpoGameCenterModule: Module {
    public func definition() -> ModuleDefinition {
        Name("ExpoGameCenter")

        AsyncFunction("authenticate") { (promise: Promise) in
            DispatchQueue.main.async {
                var hasResolved = false

                GKLocalPlayer.local.authenticateHandler = { viewController, error in
                    guard !hasResolved else { return }

                    if let error = error {
                        hasResolved = true
                        promise.reject("AUTH_ERROR", error.localizedDescription)
                        return
                    }

                    if let vc = viewController {
                        // Present Game Center login UI
                        if let scene = UIApplication.shared.connectedScenes.first as? UIWindowScene,
                           let rootVC = scene.windows.first(where: { $0.isKeyWindow })?.rootViewController {
                            rootVC.present(vc, animated: true)
                        }
                        // Don't resolve — handler fires again after login completes
                        return
                    }

                    hasResolved = true
                    if GKLocalPlayer.local.isAuthenticated {
                        let player = GKLocalPlayer.local
                        promise.resolve([
                            "playerID": player.gamePlayerID,
                            "displayName": player.displayName,
                            "alias": player.alias
                        ])
                    } else {
                        promise.reject("NOT_AUTHENTICATED", "Game Center-autentisering ble avbrutt")
                    }
                }
            }
        }

        Function("isAuthenticated") { () -> Bool in
            return GKLocalPlayer.local.isAuthenticated
        }

        AsyncFunction("getPlayer") { (promise: Promise) in
            guard GKLocalPlayer.local.isAuthenticated else {
                promise.reject("NOT_AUTHENTICATED", "Spilleren er ikke logget inn på Game Center")
                return
            }

            let player = GKLocalPlayer.local
            promise.resolve([
                "playerID": player.gamePlayerID,
                "displayName": player.displayName,
                "alias": player.alias
            ])
        }
    }
}
