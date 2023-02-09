USE [master]

IF db_id('ArtHub') IS NULL
	CREATE DATABASE [ArtHub]
GO

USE [ArtHub]
GO

DROP TABLE IF EXISTS [Listing];
DROP TABLE IF EXISTS [User];
DROP TABLE IF EXISTS [Tag];
DROP TABLE IF EXISTS [Medium];
DROP TABLE IF EXISTS [ListingTag];
DROP TABLE IF EXISTS [ListingMedium];
DROP TABLE IF EXISTS [Messaging];
GO


CREATE TABLE [Listing] (
  [Id] int IDENTITY(1, 1),
  [Description] nvarchar(255),
  [UserId] int IDENTITY(1, 1),
  PRIMARY KEY ([Id], [UserId])
)
GO

CREATE TABLE [Messaging] (
  [Id] int IDENTITY(1,1),
  [Content] nvarchar(255),
  [UserId] int IDENTITY(1,1),
  PRIMARY KEY ([Id], [UserId])
)
GO

CREATE TABLE [User] (
  [Id] int IDENTITY(1, 1),
  [FirebaseUserId] int IDENTITY(1, 1),
  [FirstName] nvarchar(255) NOT NULL,
  [LastName] nvarchar(255) NOT NULL,
  [UserName] nvarchar(255) NOT NULL,
  [Email] nvarchar(255) NOT NULL,
  PRIMARY KEY ([Id], [FirebaseUserId])
)
GO

CREATE TABLE [Tag] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Medium] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [ListingTag] (
  [Id] int IDENTITY(1, 1),
  [ListingId] int IDENTITY(1, 1),
  [TagId] int IDENTITY(1, 1),
  PRIMARY KEY ([Id], [ListingId], [TagId])
)
GO

CREATE TABLE [ListingMedium] (
  [Id] int IDENTITY(1, 1),
  [ListingId] int IDENTITY(1, 1),
  [MediumId] int IDENTITY(1, 1),
  PRIMARY KEY ([Id], [ListingId], [MediumId])
)
GO

ALTER TABLE [ListingTag] ADD FOREIGN KEY ([ListingId]) REFERENCES [Listing] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [ListingMedium] ADD FOREIGN KEY ([ListingId]) REFERENCES [Listing] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [Tag] ADD FOREIGN KEY ([Id]) REFERENCES [ListingTag] ([TagId])
GO

ALTER TABLE [Listing] ADD FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])
GO

ALTER TABLE [Medium] ADD FOREIGN KEY ([Id]) REFERENCES [ListingMedium] ([MediumId])
GO
