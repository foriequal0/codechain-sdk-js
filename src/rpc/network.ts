import { Rpc } from ".";

export class NetworkRpc {
    private rpc: Rpc;

    /**
     * @hidden
     */
    constructor(rpc: Rpc) {
        this.rpc = rpc;
    }

    /**
     * Connect to node
     * @param address Node address which to connect
     * @param port
     */
    public connect(address: string, port: number): Promise<null> {
        if (!isIpAddressString(address)) {
            throw Error(
                `Expected the first argument of connect to be an IP address string but found ${address}`
            );
        }
        if (!isPortNumber(port)) {
            throw Error(
                `Expected the second argument of connect to be a port number but found ${port}`
            );
        }
        return new Promise((resolve, reject) => {
            this.rpc
                .sendRpcRequest("net_connect", [address, port])
                .then(result => {
                    if (result === null) {
                        return resolve(null);
                    }
                    reject(
                        Error(
                            `Expected net_connect to return null but it returned ${result}`
                        )
                    );
                })
                .catch(reject);
        });
    }

    /**
     * Disconnect from the node
     * @param address Node address which to disconnect
     * @param port
     */
    public disconnect(address: string, port: number): Promise<null> {
        if (!isIpAddressString(address)) {
            throw Error(
                `Expected the first argument of disconnect to be an IP address string but found ${address}`
            );
        }
        if (!isPortNumber(port)) {
            throw Error(
                `Expected the second argument of disconnect to be a port number but found ${port}`
            );
        }
        return new Promise((resolve, reject) => {
            this.rpc
                .sendRpcRequest("net_disconnect", [address, port])
                .then(result => {
                    if (result === null) {
                        return resolve(null);
                    }
                    reject(
                        Error(
                            `Expected net_disconnect to return null but it returned ${result}`
                        )
                    );
                })
                .catch(reject);
        });
    }

    /**
     * Check the node is connected
     * @param address Node address
     * @param port
     */
    public isConnected(address: string, port: number): Promise<boolean> {
        if (!isIpAddressString(address)) {
            throw Error(
                `Expected the first argument of isConnected to be an IP address string but found ${address}`
            );
        }
        if (!isPortNumber(port)) {
            throw Error(
                `Expected the second argument of isConnected to be a port number but found ${port}`
            );
        }
        return new Promise((resolve, reject) => {
            this.rpc
                .sendRpcRequest("net_isConnected", [address, port])
                .then(result => {
                    if (typeof result === "boolean") {
                        return resolve(result);
                    }
                    reject(
                        Error(
                            `Expected net_isConnected to return a boolean but it returned ${result}`
                        )
                    );
                })
                .catch(reject);
        });
    }

    /**
     * Get the port
     */
    public getPort(): Promise<number> {
        return new Promise((resolve, reject) => {
            this.rpc
                .sendRpcRequest("net_getPort", [])
                .then(result => {
                    if (isPortNumber(result)) {
                        return resolve(result);
                    }
                    reject(
                        Error(
                            `Expected net_getPort to return a port number but it returned ${result}`
                        )
                    );
                })
                .catch(reject);
        });
    }

    /**
     * Get the number of established peers
     */
    public getPeerCount(): Promise<number> {
        return new Promise((resolve, reject) => {
            this.rpc
                .sendRpcRequest("net_getPeerCount", [])
                .then(result => {
                    if (typeof result === "number") {
                        return resolve(result);
                    }
                    reject(
                        Error(
                            `Expected net_getPeerCount to return a number but it returned ${result}`
                        )
                    );
                })
                .catch(reject);
        });
    }

    /**
     * Get the addresses of established peers
     */
    public getPeers(): Promise<string[]> {
        return new Promise((resolve, reject) => {
            this.rpc
                .sendRpcRequest("net_getEstablishedPeers", [])
                .then(result => {
                    if (!Array.isArray(result)) {
                        return reject(
                            Error(
                                `Expected net_getEstablishedPeers to return an array but it returned ${result}`
                            )
                        );
                    }
                    result.forEach((address, index) => {
                        if (!isSocketAddressString(address)) {
                            return reject(
                                Error(
                                    `Expected net_getEstablishedPeers to return an array of IPv4 address but found ${address} at ${index}`
                                )
                            );
                        }
                    });
                    resolve(result);
                })
                .catch(reject);
        });
    }

    /**
     * Add the IP to whitelist
     * @param ip Node IP
     */
    public addToWhitelist(ipCidr: string, tag?: string): Promise<null> {
        if (!isIpCidrAddressString(ipCidr)) {
            throw Error(
                `Expected the first argument of addToWhitelist to be an IP Cidr block address string but found ${ipCidr}`
            );
        }
        if (tag !== undefined && typeof tag !== "string") {
            throw Error(
                `Expected the second arguments of addToWhitelist to be a string but found ${tag}`
            );
        }
        return new Promise((resolve, reject) => {
            this.rpc
                .sendRpcRequest("net_addToWhitelist", [ipCidr, tag || null])
                .then(result => {
                    if (result === null) {
                        return resolve(null);
                    }
                    reject(
                        Error(
                            `Expected net_addToWhitelist to return null but it returned ${result}`
                        )
                    );
                })
                .catch(reject);
        });
    }

    /**
     * Remove the IP from whitelist
     * @param ip Node IP
     */
    public removeFromWhitelist(ipCidr: string): Promise<null> {
        if (!isIpCidrAddressString(ipCidr)) {
            throw Error(
                `Expected the first argument of removeFromWhitelist to be an IP Cidr block address string but found ${ipCidr}`
            );
        }
        return new Promise((resolve, reject) => {
            this.rpc
                .sendRpcRequest("net_removeFromWhitelist", [ipCidr])
                .then(result => {
                    if (result === null) {
                        return resolve(null);
                    }
                    reject(
                        Error(
                            `Expected net_removeFromWhitelist to return null but it returned ${result}`
                        )
                    );
                })
                .catch(reject);
        });
    }

    /**
     * Add the IP to blacklist
     * @param ip Node IP
     */
    public addToBlacklist(ipCidr: string, tag?: string): Promise<null> {
        if (!isIpCidrAddressString(ipCidr)) {
            throw Error(
                `Expected the first argument of addToBlacklist to be an IP Cidr block address string but found ${ipCidr}`
            );
        }
        if (tag !== undefined && typeof tag !== "string") {
            throw Error(
                `Expected the second arguments of addToWhitelist to be a string but found ${tag}`
            );
        }
        return new Promise((resolve, reject) => {
            this.rpc
                .sendRpcRequest("net_addToBlacklist", [ipCidr, tag || null])
                .then(result => {
                    if (result === null) {
                        return resolve(null);
                    }
                    reject(
                        Error(
                            `Expected net_addToBlacklist to return null but it returned ${result}`
                        )
                    );
                });
        });
    }

    /**
     * Remove the IP from blacklist
     * @param ip Node IP
     */
    public removeFromBlacklist(ipCidr: string): Promise<null> {
        if (!isIpCidrAddressString(ipCidr)) {
            throw Error(
                `Expected the first argument of removeFromBlacklist to be an IP Cidr block address string but found ${ipCidr}`
            );
        }
        return new Promise((resolve, reject) => {
            this.rpc
                .sendRpcRequest("net_removeFromBlacklist", [ipCidr])
                .then(result => {
                    if (result === null) {
                        return resolve(null);
                    }
                    reject(
                        Error(
                            `Expected net_removeFromBlacklist to return null but it returned ${result}`
                        )
                    );
                })
                .catch(reject);
        });
    }

    /**
     * Enable whitelist
     */
    public enableWhitelist(): Promise<null> {
        return new Promise((resolve, reject) => {
            this.rpc
                .sendRpcRequest("net_enableWhitelist", [])
                .then(result => {
                    if (result === null) {
                        return resolve(null);
                    }
                    reject(
                        Error(
                            `Expected net_enableWhitelist to return null but it returned ${result}`
                        )
                    );
                })
                .catch(reject);
        });
    }

    /**
     * Disable whitelist
     */
    public disableWhitelist(): Promise<null> {
        return new Promise((resolve, reject) => {
            this.rpc
                .sendRpcRequest("net_disableWhitelist", [])
                .then(result => {
                    if (result === null) {
                        return resolve(null);
                    }
                    reject(
                        Error(
                            `Expected net_disableWhitelist to return null but it returned ${result}`
                        )
                    );
                })
                .catch(reject);
        });
    }

    /**
     * Enable blacklist
     */
    public enableBlacklist(): Promise<null> {
        return new Promise((resolve, reject) => {
            this.rpc
                .sendRpcRequest("net_enableBlacklist", [])
                .then(result => {
                    if (result === null) {
                        return resolve(null);
                    }
                    reject(
                        Error(
                            `Expected net_enableBlacklist to return null but it returned ${result}`
                        )
                    );
                })
                .catch(reject);
        });
    }

    /**
     * Disable blacklist
     */
    public disableBlacklist(): Promise<null> {
        return new Promise((resolve, reject) => {
            this.rpc
                .sendRpcRequest("net_disableBlacklist", [])
                .then(result => {
                    if (result === null) {
                        return resolve(null);
                    }
                    reject(
                        Error(
                            `Expected net_disableBlacklist to return null but it returned ${result}`
                        )
                    );
                })
                .catch(reject);
        });
    }

    /**
     * Get the status of whitelist
     */
    public getWhitelist(): Promise<{ list: string[]; enabled: boolean }> {
        return new Promise((resolve, reject) => {
            this.rpc
                .sendRpcRequest("net_getWhitelist", [])
                .then(result => {
                    if (result === null || typeof result !== "object") {
                        return reject(
                            Error(
                                `Expected net_getWhitelist to return an object but it returned ${result}`
                            )
                        );
                    }
                    const { list, enabled } = result;
                    if (Array.isArray(list) && typeof enabled === "boolean") {
                        // FIXME: Check whether the strings in the list are valid.
                        return resolve(result);
                    }
                    reject(
                        Error(
                            `Expected net_getWhitelist to return { list: string[], enabled: boolean } but it returned ${JSON.stringify(
                                result
                            )}`
                        )
                    );
                })
                .catch(reject);
        });
    }

    /**
     * Get the status of blacklist
     */
    public getBlacklist(): Promise<{ list: string[]; enabled: boolean }> {
        return new Promise((resolve, reject) => {
            this.rpc
                .sendRpcRequest("net_getBlacklist", [])
                .then(result => {
                    if (result === null || typeof result !== "object") {
                        return reject(
                            Error(
                                `Expected net_getBlacklist to return an object but it returned ${result}`
                            )
                        );
                    }
                    const { list, enabled } = result;
                    if (Array.isArray(list) && typeof enabled === "boolean") {
                        // FIXME: Check whether the strings in the list are valid.
                        return resolve(result);
                    }
                    reject(
                        Error(
                            `Expected net_getBlacklist to return { list: string[], enabled: boolean } but it returned ${JSON.stringify(
                                result
                            )}`
                        )
                    );
                })
                .catch(reject);
        });
    }
}

function isIpAddressString(value: any): boolean {
    return /\b((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}\b/.test(value);
}

function isIpCidrAddressString(value: any): boolean {
    return /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\/([0-9]|[1-2][0-9]|3[0-2]))?$/.test(
        value
    );
}

function isSocketAddressString(value: any): boolean {
    return /((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|:)){4}([0-9]{1,4}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])/.test(
        value
    );
}

function isPortNumber(value: any): boolean {
    return (
        typeof value === "number" &&
        Number.isInteger(value) &&
        0 <= value &&
        value < 0xffff
    );
}
