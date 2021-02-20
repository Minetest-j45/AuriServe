export default `
	type Role implements Resource & TrackModifications {
		id: ID!
		user: User
		created: Date!

		lastModified: Int
		lastModifier: User

		color: Color
		abilities: [String!]!
		users: [User!]!
	}
`;
