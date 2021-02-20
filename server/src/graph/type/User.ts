export default `
	type User {
		id: ID!
		name: String!
		emails: [String!]!
		roles: [Role!]!
		media: [Media!]!
		themes: [Theme!]!
		plugins: [Plugin!]!
	}
`;
