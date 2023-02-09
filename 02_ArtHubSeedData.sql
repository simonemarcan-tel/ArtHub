USE [ArtHub];
GO

set identity_insert [Listing] on
insert into Listing (Id, Description, UserId)
values (1, 'This is the first piece I made my senior year of highschool.', 1)

set identity_insert [Listing] off

set identity_insert [ListingMedium] on
insert into ListingMedium (Id, ListingId, MediumId)
values (1, 1, 1)

set identity_insert [ListingMedium] off

set identity_insert [ListingTag] on
insert into ListingTag (Id, ListingId, TagId)
values (1, 1, 1)

set identity_insert [ListingTag] off

set identity_insert [User] on
insert into [User] (Id, FirebaseUserId, FirstName, LastName, UserName, Email)
values (1, '7LBFCqJFSpNgzY3zZh4lLDugiSX2', 'Simone', 'Marcantel', 'sm.art', 'simone@gmail.com')

set identity_insert [User] off