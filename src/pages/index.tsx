import { AtSignIcon, EmailIcon } from '@chakra-ui/icons';
import {
	Box,
	Button,
	Container,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input,
	InputGroup,
	InputLeftElement,
	VStack,
	Image,
} from '@chakra-ui/react';
import { ChangeEvent, FormEvent, useState } from 'react';
import axios from 'axios';

type InputEvent = ChangeEvent<HTMLInputElement>;

export default function Home(): JSX.Element {
	const [formState, setFormState] = useState({
		name: '',
		email: '',
	});

	const [loading, setLoading] = useState(false);

	const handleChange = (event: InputEvent) => {
		const { name, value } = event.target;

		setFormState((old) => ({ ...old, [name]: value }));
	};

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();

		try {
			setLoading(true);
			await axios.post('/api/users', {
				...formState,
			});
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Container maxW="container.lg" height="100vh">
			<Box margin="0 auto" maxW="md">
				<Flex flexDir="column" justifyContent="center">
					<Image src="/iamgenew.svg" />
					<Heading fontSize="3xl" color="blue.500" textAlign="center">
						Inscreva-se na nossa newsletter
					</Heading>

					<Flex flexDir="column" width="100%" mt="3">
						<VStack spacing="5">
							<FormControl>
								<FormLabel>Seu primeiro nome</FormLabel>
								<InputGroup>
									<InputLeftElement>
										<AtSignIcon color="blue.500" />
									</InputLeftElement>
									<Input
										value={formState.name}
										type="text"
										placeholder="nome"
										name="name"
										autoComplete="name"
										onChange={handleChange}
									/>
								</InputGroup>
							</FormControl>

							<FormControl>
								<FormLabel>Seu e-mail principal</FormLabel>
								<InputGroup>
									<InputLeftElement>
										<EmailIcon color="blue.500" />
									</InputLeftElement>
									<Input
										value={formState.email}
										type="email"
										placeholder="E-mail"
										name="email"
										autoComplete="email"
										onChange={handleChange}
									/>
								</InputGroup>
							</FormControl>
						</VStack>
					</Flex>
					<Button
						isLoading={loading}
						isFullWidth
						variant="solid"
						_hover={{
							background: 'blue.500',
						}}
						mt="5"
						bg="blue.400"
						color="white"
						onClick={handleSubmit}
					>
						Assinar
					</Button>
				</Flex>
			</Box>
		</Container>
	);
}
