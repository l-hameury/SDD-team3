namespace rtchatty.Database
{
	public class ChattyDatabaseSettings : IChattyDatabaseSettings
	{
		public string UsersCollectionName { get; set; }
		public string ConnectionString { get; set; }
		public string DatabaseName { get; set; }
	}
}