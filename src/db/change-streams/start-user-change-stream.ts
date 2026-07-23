import {userViewCollection} from "../mongo.read.db";

export function startUserChangeStream(collection: any) {
    const changeStream = collection.watch();

    changeStream.on("change", async (event: any) => {
        console.log("EVENT:", event);

        if (event.operationType === "insert") {
            const fullDocument = event.fullDocument;

            await userViewCollection.insertOne({
                id: fullDocument._id.toString(),
                login: fullDocument.login,
                email: fullDocument.email,
                createdAt: fullDocument.createdAt
            });
        }

        if (event.operationType === "update") {
            // обновление read‑модели
        }

        if (event.operationType === "delete") {
            // удаление из read‑модели
        }
    });
}