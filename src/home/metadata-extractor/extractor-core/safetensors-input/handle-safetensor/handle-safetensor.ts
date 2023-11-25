import { Buffer } from 'buffer';

interface parsedContainer {
    [key: string]: any;
}

function recursiveParser(target: any) {
    try {
        if (target == null) return target;
        if (typeof target === "string") target = JSON.parse(target);
        if (typeof target !== "object") return target;
        const container: parsedContainer = {};
        for (let [key, val] of Object.entries(target)) {
            if (["string", "object"].includes(typeof val)) val = recursiveParser(val);
            container[key] = val;
        }
        return container;
    } catch (error) {
        if (error instanceof SyntaxError) {
            return target;
        } else {
            throw error;
        }
    }

}

export function handleSafetensors(target: File, cb: (jsoncontent: string) => void, errcb: (errMsg: string) => void): void {
    let doReadMetadataLenOnce = false;
    let metadataLen: number;
    let buffer: Uint8Array | null = null;
    const stream = target?.stream();
    const reader = stream?.getReader();
    reader?.read().then(function process({ done, value }): any {
        if (done) {
            return;
        }

        const chunk = value;
        if (!buffer) {
            buffer = chunk
        } else {
            let mergedArray = new Uint8Array(buffer.length + chunk.length);
            mergedArray.set(buffer);
            mergedArray.set(chunk, buffer.length);
            buffer = mergedArray;
        }

        if (!doReadMetadataLenOnce) {
            metadataLen = Buffer.from(buffer.slice(0, 7)).readInt32LE();
            doReadMetadataLenOnce = true;
        }

        if (doReadMetadataLenOnce && (metadataLen + 2 < buffer.length)) {
            try {
                let s = (new TextDecoder().decode(buffer.slice(8, (metadataLen + 8))));
                const wholeMetadata = JSON.parse(s);
                if (wholeMetadata["__metadata__"]) {
                    const parsedData = recursiveParser(wholeMetadata["__metadata__"]);
                    cb(JSON.stringify(parsedData, undefined, 4));
                } else {
                    errcb("The File Does Not Have Metadata.");
                }
            } catch (error) {
                errcb("Invalid Safetensors File.");
            }

            reader.cancel();
        }

        // Read some more, and call this function again
        return reader.read().then(process);

    })

}