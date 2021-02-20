export default `
	type Plugin implements Resource {
		id: ID!
		user: User
		created: Date!

		enabled: Boolean!

		name: String!
		description: String!
		author: String!
		coverPath: String
	}
`;
