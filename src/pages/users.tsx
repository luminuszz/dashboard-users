import {
	Container,
	Flex,
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	Text,
	Image,
} from '@chakra-ui/react';
import axios from 'axios';
import { GetServerSideProps } from 'next';

type User = {
	avatar: string;
	name: string;
	email: string;
	_id: string | number;
};

interface Props {
	users: User[];
}

export default function Home({ users }: Props): JSX.Element {
	console.log('users', users);

	return (
		<Container maxW="container.xl">
			<Flex justifyContent="center" alignItems="center" flexDir="column">
				<Text fontSize="5xl" textAlign="center" color="purple.500">
					Tabela de usuários
				</Text>

				<Table
					variant="striped"
					marginTop="14"
					fullWidth
					width="100%"
					maxW="container.md"
					size="md"
				>
					<Thead>
						<Tr>
							<Th>Avatar</Th>
							<Th>Id</Th>
							<Th>Nome</Th>
							<Th>E-mail</Th>
						</Tr>
					</Thead>
					<Tbody>
						{users.map((user) => (
							<Tr key={user._id}>
								<Td>
									<Image
										fallbackSrc="/user.svg"
										src={user.avatar}
										width="40px"
										height="40px"
										borderRadius="full"
									/>
								</Td>
								<Td>{user._id}</Td>
								<Td>{user.name}</Td>
								<Td>{user.email}</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			</Flex>
		</Container>
	);
}

export const getServerSideProps: GetServerSideProps = async () => {
	try {
		const { data } = await axios.get('http://localhost:3000/api/getUsers');

		return {
			props: {
				users: data.users,
			},
		};
	} catch (error) {
		console.log(error);

		return {
			props: {},
		};
	}
};
