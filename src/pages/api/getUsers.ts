import { MongoClient } from 'mongodb';
import { GetServerSideProps, NextApiRequest, NextApiResponse } from 'next';
import { User } from './users';
import axios from 'axios';

export async function getMongoConnect() {
	const uri = process.env.MONGO_URL_CONNECT;

	const client = new MongoClient(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	return client;
}

export default async function getUsers(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const connection = await getMongoConnect();

	try {
		await connection.connect();

		const userCollection = connection
			.db('newsletter')
			.collection<User>('users');

		const users = await userCollection.find().toArray();

		return res.status(200).json({
			users,
		});
	} catch (error) {
		return res.status(400).json({
			message: error.message,
		});
	} finally {
		await connection.close();
	}
}
