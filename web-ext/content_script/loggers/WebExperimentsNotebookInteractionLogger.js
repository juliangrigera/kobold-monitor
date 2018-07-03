class WebExperimentsNotebookInteractionLogger extends AbstractInteractionLogger {
    constructor(nextLogger) {
        super(nextLogger);
    }

    /**
     * Logs the interaction to the console
     * @param {*} href The href where the interaction was obseved
     * @param {*} interactionDescriptor A string to name/identify this interaction
     * @param {*} data All other info that might be relevant
     */
    log(href, interactionDescriptor, data) {
        browser.runtime
            .sendMessage("RemoteUsabilityTests@lifia.info.unlp.edu.ar", {
                methodName: "logExternalKoboldEvent",
                arguments: {
                    event: {
                        href: href,
                        interactionDescriptor: interactionDescriptor,
                        data: data
                    }
                }
            })
            .catch((error) => {
                console.log("Could not talk to the notebook", error);
            });
        super.log(href, interactionDescriptor, data);
    }
}
