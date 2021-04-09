import { NextApiResponse, NextApiRequest } from 'next';
import { middlewareHttpMethods } from '../_lib/methodMiddlware';
import { MongoClient } from 'mongodb';

export type User = {
	avatar: string;
	name: string;
	email: string;
};

type UserRequest = {
	name: string;
	email: string;
};

export async function getMongoConnect() {
	const uri = process.env.MONGO_URL_CONNECT;

	const client = new MongoClient(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	return client;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
	await middlewareHttpMethods({
		allowMethods: 'POST',
		req,
		res,
	});

	const dbConnection = await getMongoConnect();

	const user = req.body as UserRequest;

	await dbConnection.connect();

	const userCollection = dbConnection
		.db('newsletter')
		.collection<User>('users');

	const response = await userCollection.insertOne({
		avatar: 'https://robohash.org/inventorequiaatque.png?size=50x50&set=set1',
		email: user.email,
		name: user.name,
	});

	await dbConnection.close();

	return res.status(200).json({
		message: response.result,
	});
};
