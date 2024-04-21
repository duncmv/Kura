-- Active: 1713150400757@@127.0.0.1@5432@kura_db@public
DROP DATABASE kura_db;

-- Create database + user if doesn't exist
CREATE DATABASE kura_db;

-- Drop the user
DROP ROLE kura_user;

-- Create the user and grant privilages
CREATE ROLE kura_user WITH LOGIN PASSWORD 'test_choices_01';
GRANT ALL ON DATABASE kura_db TO kura_user;

-- switching to kura_user and kura_db
\c kura_db kura_user
INSERT INTO countries VALUES ('Uganda', '000daded-1a7c-4ca7-8f16-6aa4026fa0e7','2024-04-15 01:18:37','2024-04-15 01:18:37');

INSERT INTO districts VALUES
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Abim', '523b94d6-29a6-48c3-93d6-b1d50067dbd3', '2024-04-15T11:52:53.258966', '2024-04-15T11:52:53.258974'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Adjumani', 'd0d6f480-b562-4d37-a335-31485df575e5', '2024-04-15T11:52:53.259122', '2024-04-15T11:52:53.259127'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Agago', 'fea703c9-4a04-4fbc-97f5-0d8bc7a36054', '2024-04-15T11:52:53.259216', '2024-04-15T11:52:53.259219'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Alebtong', 'e02e7fcf-a231-42f5-9041-94963252fdb7', '2024-04-15T11:52:53.259293', '2024-04-15T11:52:53.259297'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Amolatar', '906c3bdf-ac3f-464a-a7b6-e50d31ac6e04', '2024-04-15T11:52:53.259371', '2024-04-15T11:52:53.259375'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Amudat', 'abeb7e66-6ffa-4376-bb3c-5d1b6cc2740f', '2024-04-15T11:52:53.259440', '2024-04-15T11:52:53.259443'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Amuria', '4640ce1c-a62e-4896-876a-e52d06295e8e', '2024-04-15T11:52:53.259511', '2024-04-15T11:52:53.259515'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Amuru', '541c6cca-3f30-4470-bbd5-247e39557317', '2024-04-15T11:52:53.259576', '2024-04-15T11:52:53.259579'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Apac', '5584389b-ff67-4f58-aff7-1b5324ac0ea1', '2024-04-15T11:52:53.259638', '2024-04-15T11:52:53.259641'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Arua', 'abb214c1-fc2d-4674-b56e-b2f45953a0ec', '2024-04-15T11:52:53.259704', '2024-04-15T11:52:53.259708'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Binyin', '51211985-68be-470d-b077-b5afdf2e9605', '2024-04-15T11:52:53.259773', '2024-04-15T11:52:53.259776'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Budaka', '1469d2c8-97d7-49bf-84cd-5b0b9b57b98e', '2024-04-15T11:52:53.259853', '2024-04-15T11:52:53.259862'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Bududa', '574f0f96-c621-4d3e-bc7f-34f4b29b160f', '2024-04-15T11:52:53.259969', '2024-04-15T11:52:53.259973'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Bugembe', '9388b35c-1beb-4e8a-94ae-f47a39d69285', '2024-04-15T11:52:53.260081', '2024-04-15T11:52:53.260089'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Bugiri', '23b0ede0-ae30-41d2-95f8-81d3463f6a35', '2024-04-15T11:52:53.260200', '2024-04-15T11:52:53.260204'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Buhweju', '623059f9-f94e-411b-8b01-5cfe368637c8', '2024-04-15T11:52:53.260269', '2024-04-15T11:52:53.260273'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Buikwe', '1df69796-a184-4512-95f6-3678b30bb2ae', '2024-04-15T11:52:53.260334', '2024-04-15T11:52:53.260337'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Bukedea', '100a7b7d-a06f-4fcf-937c-ce79b026a067', '2024-04-15T11:52:53.260397', '2024-04-15T11:52:53.260400'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Bukomansimbi', '51b937e9-a145-469c-9e5f-5c88df98bfc1', '2024-04-15T11:52:53.260468', '2024-04-15T11:52:53.260471'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Bukwa', '850624eb-b240-4560-b454-da77059b4685', '2024-04-15T11:52:53.260530', '2024-04-15T11:52:53.260533'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Bulambuli', '53535048-6ee5-410a-b980-7f60c3cddd45', '2024-04-15T11:52:53.260592', '2024-04-15T11:52:53.260595'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Bulisa', '42b14378-fb74-40f2-a11d-8655e2dc8393', '2024-04-15T11:52:53.260653', '2024-04-15T11:52:53.260657'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Bundibugyo', 'aa309491-08ef-482f-97a9-738f8fbc28af', '2024-04-15T11:52:53.260718', '2024-04-15T11:52:53.260721'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Busembatia', '0ee67ffc-4ad3-485d-a8a9-6d9b9ab53fa0', '2024-04-15T11:52:53.260781', '2024-04-15T11:52:53.260785'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Bushenyi', '545f7153-c79a-4661-8905-86f09646e106', '2024-04-15T11:52:53.260856', '2024-04-15T11:52:53.260859'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Busia', 'e9bd3802-ed6d-406d-b16a-eaabd0ec3972', '2024-04-15T11:52:53.260924', '2024-04-15T11:52:53.260928'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Butaleja', '99c77200-0c05-40bf-ba69-3afda64650a3', '2024-04-15T11:52:53.260993', '2024-04-15T11:52:53.260996'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Buwenge', 'e118cea1-6ad0-4c03-b918-4ad289cd12b3', '2024-04-15T11:52:53.261058', '2024-04-15T11:52:53.261061'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Buyende', '79437730-0ac9-4eec-9bfa-3cad7f1c5d54', '2024-04-15T11:52:53.261120', '2024-04-15T11:52:53.261123'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Bweyogerere', 'a5c7bf22-7b97-4215-8f15-8a5fbc83a921', '2024-04-15T11:52:53.261181', '2024-04-15T11:52:53.261184'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Bwizibwera', 'c6c2551e-95d3-4ecf-8568-fca0c45a6eca', '2024-04-15T11:52:53.261247', '2024-04-15T11:52:53.261251'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Byakabanda', 'cc9109b1-d275-4df4-b3c0-52427135799a', '2024-04-15T11:52:53.261320', '2024-04-15T11:52:53.261323'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Dokolo', 'f74d0c4a-7fc2-4bac-90b6-1b529d62b3fd', '2024-04-15T11:52:53.261382', '2024-04-15T11:52:53.261385'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Entebbe', '155b1a2a-e443-42d8-a38f-5aa0b793ee4d', '2024-04-15T11:52:53.261443', '2024-04-15T11:52:53.261446'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Fort Portal', '272fb1f2-96f3-434f-8475-55e228610acd', '2024-04-15T11:52:53.261509', '2024-04-15T11:52:53.261512'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Gombe', 'b385b399-f6b0-49bc-811d-b56919fa4439', '2024-04-15T11:52:53.261570', '2024-04-15T11:52:53.261573'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Gulu', '7ca8e0c1-1669-418f-b724-47c84acde768', '2024-04-15T11:52:53.261631', '2024-04-15T11:52:53.261634'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Hoima', 'c1a70d42-aed2-4bf2-84f8-14e7e8985a90', '2024-04-15T11:52:53.261698', '2024-04-15T11:52:53.261701'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Ibanda', '2fefb230-969c-4747-9392-dfd7b27678db', '2024-04-15T11:52:53.261760', '2024-04-15T11:52:53.261763'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Iganga', '525bcc31-2665-446d-864b-7ea9ebf9585f', '2024-04-15T11:52:53.261821', '2024-04-15T11:52:53.261824'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Isingiro', 'e0c2bb07-8669-4bd0-b0dd-e0fe6cc62a71', '2024-04-15T11:52:53.261887', '2024-04-15T11:52:53.261890'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Jinja', 'a56e7ae2-69d4-436b-8399-4a01a668c4a5', '2024-04-15T11:52:53.261949', '2024-04-15T11:52:53.261952'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Kaabong', '8ff75cb2-5a0f-4927-a45c-a535b1ff5f44', '2024-04-15T11:52:53.262016', '2024-04-15T11:52:53.262019'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Kabale', '5ef32fd0-bd49-4116-a132-3395c8d1a4ac', '2024-04-15T11:52:53.262080', '2024-04-15T11:52:53.262083'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Kaberamaido', 'f289f204-730e-43fd-891d-3ac99d4b3b49', '2024-04-15T11:52:53.262147', '2024-04-15T11:52:53.262150'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Kagadi', 'e70d3ec3-8447-4e02-8828-7ecc0af3e317', '2024-04-15T11:52:53.262208', '2024-04-15T11:52:53.262212'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Kajansi', '67cc5ffd-d77f-432a-8fc0-a76b5fb47020', '2024-04-15T11:52:53.262385', '2024-04-15T11:52:53.262389'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Kalangala', 'e03c000d-b3e7-4d5e-9ff8-bd86d95f2d58', '2024-04-15T11:52:53.262469', '2024-04-15T11:52:53.262472'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Kaliro', 'ffa03e49-a98b-4101-b902-487feb6729f1', '2024-04-15T11:52:53.262532', '2024-04-15T11:52:53.262536'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Kalungu', '6334f9c3-da7b-49bf-bec8-8c30dbf40b2f', '2024-04-15T11:52:53.262600', '2024-04-15T11:52:53.262603'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Kampala', '2ab6b7c8-e9d9-4b75-aa69-5d42593c2f70', '2024-04-15T11:52:53.262664', '2024-04-15T11:52:53.262667'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Kampala Central Division', '32b24b2a-a255-4717-a3ac-b1820e5787d3', '2024-04-15T11:52:53.262732', '2024-04-15T11:52:53.262735'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Kamuli', '251349a2-195e-4046-b9c2-15868b083c3b', '2024-04-15T11:52:53.262793', '2024-04-15T11:52:53.262796'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Kamwenge', 'b95fccab-4c9e-4077-accb-3baaec87133f', '2024-04-15T11:52:53.262854', '2024-04-15T11:52:53.262857'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Kanoni', 'eb6771b5-675c-4921-8dee-c1e9560237e5', '2024-04-15T11:52:53.262916', '2024-04-15T11:52:53.262919'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Kanungu', '469d7ff0-fd54-4fa4-9f6d-a27abec8bbfd', '2024-04-15T11:52:53.262983', '2024-04-15T11:52:53.262986'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Kapchorwa', 'e569419a-4da9-4d58-8786-bfcd31ee6207', '2024-04-15T11:52:53.263049', '2024-04-15T11:52:53.263053'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Kasese', '63e4c71c-70aa-4486-b5ca-436b0eee4ac4', '2024-04-15T11:52:53.263116', '2024-04-15T11:52:53.263119'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Katakwi', 'b5b9077c-6c5e-4cf3-967c-bf3f53f9e393', '2024-04-15T11:52:53.263177', '2024-04-15T11:52:53.263180'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Kayunga', '62777e0f-53d9-4e68-ab82-02078997a721', '2024-04-15T11:52:53.263237', '2024-04-15T11:52:53.263240'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Kibale', 'd5ef59b3-b3de-43df-94ed-3bca82041a36', '2024-04-15T11:52:53.263303', '2024-04-15T11:52:53.263306'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Kibingo', 'c6bb91c4-b3e0-4c42-8d7a-909ff5cb0c67', '2024-04-15T11:52:53.263365', '2024-04-15T11:52:53.263368'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Kiboga', 'c271c8b0-6977-4bd7-bd99-e5025ae3dadd', '2024-04-15T11:52:53.263425', '2024-04-15T11:52:53.263428'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Kibuku', '98d45d3b-8362-47da-9d18-633fc2dc3c94', '2024-04-15T11:52:53.263486', '2024-04-15T11:52:53.263489'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Kigorobya', '5c79d203-4a40-48d6-bfbd-8b932a8eb421', '2024-04-15T11:52:53.263553', '2024-04-15T11:52:53.263556'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Kilembe', 'f4dc8d37-d9f3-42d5-be3a-fb325f2840a2', '2024-04-15T11:52:53.263614', '2024-04-15T11:52:53.263617'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Kireka', '58807b69-ae3a-49ef-843e-19a44e545a3b', '2024-04-15T11:52:53.263675', '2024-04-15T11:52:53.263678'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Kiruhura', 'b6631444-2a76-41f4-9e32-c83ce1ea2758', '2024-04-15T11:52:53.263736', '2024-04-15T11:52:53.263739'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Kiryandongo', 'd5510917-370f-4e36-b018-37dc8449be48', '2024-04-15T11:52:53.263796', '2024-04-15T11:52:53.263800'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Kisoro', 'ed7bbb14-96ca-4bd4-b1cc-151d9f78d869', '2024-04-15T11:52:53.263857', '2024-04-15T11:52:53.263860'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Kitamilo', '8b621939-2ce4-4e4a-983d-c299b6dcb5be', '2024-04-15T11:52:53.263917', '2024-04-15T11:52:53.263920'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Kitgum', '9cf0b159-c499-48f9-ada2-17255e74910c', '2024-04-15T11:52:53.263984', '2024-04-15T11:52:53.263988'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Koboko', '82e51d55-1ed7-45a5-ad1a-ae97a36d1564', '2024-04-15T11:52:53.264057', '2024-04-15T11:52:53.264060'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Kole', '983b84bb-bf47-42e5-98e1-8acb298c3ce1', '2024-04-15T11:52:53.264119', '2024-04-15T11:52:53.264123'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Kotido', '4379b894-84c9-42d3-b37e-5a33a27ad039', '2024-04-15T11:52:53.264181', '2024-04-15T11:52:53.264184'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Kumi', 'b155a647-1e41-4159-a92d-0ffc055375a3', '2024-04-15T11:52:53.264242', '2024-04-15T11:52:53.264246'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Kyankwanzi', '34b72ed6-d4dc-4836-be72-f55576f0dacc', '2024-04-15T11:52:53.264304', '2024-04-15T11:52:53.264307'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Kyegegwa', '0080f83f-44dc-4aaa-8561-0fd901b7a35c', '2024-04-15T11:52:53.264376', '2024-04-15T11:52:53.264380'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Kyenjojo', 'a47ba763-6c6c-41b1-bc01-11494179e39b', '2024-04-15T11:52:53.264444', '2024-04-15T11:52:53.264447'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Kyotera', '2353c94d-b1cb-40e1-9144-517e2fad2b40', '2024-04-15T11:52:53.264506', '2024-04-15T11:52:53.264509'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Lamwo', '9b57ee08-2b33-44f5-9946-f698c28059f1', '2024-04-15T11:52:53.264566', '2024-04-15T11:52:53.264570'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Lira', 'c76b7272-6ab0-4707-8ded-aa5d7a053df5', '2024-04-15T11:52:53.264628', '2024-04-15T11:52:53.264632'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Lugazi', 'd515af10-1f39-4963-9361-5a6b1b9a0524', '2024-04-15T11:52:53.264697', '2024-04-15T11:52:53.264701'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Luuka Town', '87febdb9-642a-4233-b533-112147d144ab', '2024-04-15T11:52:53.264760', '2024-04-15T11:52:53.264764'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Luwero', '7aea15a2-002a-43d1-84aa-09210ffb7ba8', '2024-04-15T11:52:53.264828', '2024-04-15T11:52:53.264832'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Lwengo', 'c444803c-bd65-44c5-923f-942fb4ece570', '2024-04-15T11:52:53.264891', '2024-04-15T11:52:53.264894'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Lyantonde', 'dce66722-1477-4379-8b9f-b18e78f8cd2a', '2024-04-15T11:52:53.264956', '2024-04-15T11:52:53.264960'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Manafwa', '33f63832-649e-4ea5-bc53-f03340e41cd9', '2024-04-15T11:52:53.265017', '2024-04-15T11:52:53.265021'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Maracha', 'fbd68e87-a0a3-4500-aa87-bff8df9512d1', '2024-04-15T11:52:53.265083', '2024-04-15T11:52:53.265086'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Margherita', 'acb136dd-0204-4600-9d38-f297a47ace0f', '2024-04-15T11:52:53.265146', '2024-04-15T11:52:53.265149'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Masaka', '59b67a6f-708a-4dca-9803-1c6c9cb7a03c', '2024-04-15T11:52:53.265215', '2024-04-15T11:52:53.265218'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Masindi', '54d66046-ff3d-4c99-b7d2-21a688d36422', '2024-04-15T11:52:53.265277', '2024-04-15T11:52:53.265280'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Masindi Port', 'ae7fff3d-9319-43d4-a747-60220021374e', '2024-04-15T11:52:53.265339', '2024-04-15T11:52:53.265342'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Mayuge', '3962d834-69e6-4298-901f-4557e2a2e523', '2024-04-15T11:52:53.265400', '2024-04-15T11:52:53.265403'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Mbale', 'ab6bb082-fb56-41c6-aa0b-02e0bd04d896', '2024-04-15T11:52:53.265466', '2024-04-15T11:52:53.265470'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Mbarara', '16a137b4-daaf-463c-a02b-a89e82c9501e', '2024-04-15T11:52:53.265528', '2024-04-15T11:52:53.265531'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Mitoma', 'f46186d3-a2b8-4ee3-9bec-8252a57c782c', '2024-04-15T11:52:53.265595', '2024-04-15T11:52:53.265598'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Mityana', 'ebd32450-c54d-4121-a6fc-186c2ff795ad', '2024-04-15T11:52:53.265662', '2024-04-15T11:52:53.265665'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Moroto', '018a424a-38af-4dc1-b5d2-57e3a553de8e', '2024-04-15T11:52:53.265731', '2024-04-15T11:52:53.265734'),
('000daded-1a7c-4ca7-8f16-6aa4026fa0e7', 'Moyo', 'e40d7b9c-84dc-448c-880f-b497ec763767', '2024-04-15T11:52:53.265794', '2024-04-15T11:52:53.265797');


INSERT INTO legal_entities VALUES
('Sole Proprietorship', 'A business owned and operated by a single individual. The owner is personally liable for all debts and obligations of the business.', '65597d99-9875-4c31-8764-59172c16eafe', '2024-04-15T15:35:20.398459', '2024-04-15T15:35:20.398464'),
('General Partnership', 'A business owned and operated by two or more individuals who share the profits and liabilities of the business.', 'd3de8956-d472-44e6-9537-bf8b0fa84d37', '2024-04-15T15:35:20.398706', '2024-04-15T15:35:20.398708'),
('Limited Partnership (LP)', 'A partnership consisting of one or more general partners, who manage the business and are personally liable for its debts, and one or more limited partners, who contribute capital but have limited liability.', 'e0441a0c-9ce5-4575-9d87-ce1cc87895d4', '2024-04-15T15:35:20.398746', '2024-04-15T15:35:20.398747'),
('C Corporation', 'A legal entity that is separate from its owners (shareholders). It offers limited liability protection to its shareholders and has its own rights, privileges, and liabilities.', '6b123334-27c6-4552-956d-5521da5e7505', '2024-04-15T15:35:20.398778', '2024-04-15T15:35:20.398779'),
('S Corporation', 'A special type of corporation that meets specific IRS criteria for taxation. It avoids double taxation by passing corporate income, losses, deductions, and credits through to shareholders for federal tax purposes.', 'f525c15f-36d9-4fe1-b915-5990006fb8a3', '2024-04-15T15:35:20.398811', '2024-04-15T15:35:20.398813'),
('Nonprofit Corporation', 'A corporation formed for purposes other than generating profit. Nonprofit corporations typically pursue charitable, educational, religious, or scientific goals.', 'fecc23c9-eca6-42e5-8894-ecfdf0fba5d2', '2024-04-15T15:35:20.398842', '2024-04-15T15:35:20.398844'),
('Limited Liability Company (LLC)', 'A hybrid business structure that combines the limited liability protection of a corporation with the flexibility and tax benefits of a partnership. Owners are called members, and an LLC can have one or more members.', 'ce769f99-34c0-4b98-9947-5d637130df4b', '2024-04-15T15:35:20.398871', '2024-04-15T15:35:20.398872'),
('Cooperative (Co-op)', 'An organization owned and operated by a group of individuals or businesses for their mutual benefit. Members contribute to and democratically control the cooperative.', 'a4280304-7c73-47af-9f9a-bf85037ffae8', '2024-04-15T15:35:20.398897', '2024-04-15T15:35:20.398899'),
('Trust', 'A legal entity created to hold assets for the benefit of one or more beneficiaries. A trust is managed by a trustee according to the terms of the trust agreement.', '57b85d34-8eda-4e7a-852c-319e0506d8e8', '2024-04-15T15:35:20.398929', '2024-04-15T15:35:20.398931'),
('Limited Liability Partnership (LLP)', 'A partnership in which some or all partners have limited liability, meaning they are not personally liable for the debts and obligations of the partnership beyond their investment in the business.', '6287b5eb-a16d-4ae3-93e9-b1568ac622c8', '2024-04-15T15:35:20.398957', '2024-04-15T15:35:20.398958'),
('Professional Corporation (PC)', 'A corporation formed by licensed professionals, such as doctors, lawyers, or accountants, to provide professional services. It offers limited liability protection to its shareholders.', 'aea8a7ef-873d-4a93-893b-86b7470ea1f6', '2024-04-15T15:35:20.398983', '2024-04-15T15:35:20.398984'),
('Benefit Corporation (B Corp)', 'A type of corporation that is legally required to consider the impact of its decisions on society, the environment, and its stakeholders, in addition to generating profit for shareholders.', 'cf83627a-a6cb-42de-a53d-858470a293ef', '2024-04-15T15:35:20.399023', '2024-04-15T15:35:20.399024');


INSERT INTO institutions VALUES 
('info@examplecorp.com', 'password123', 'Example Corporation', 'Technology', '77777777', '2000-01-01', '12345', '1234567890', 'None', 'http://www.examplecorp.com', 'abb214c1-fc2d-4674-b56e-b2f45953a0ec', 'd3de8956-d472-44e6-9537-bf8b0fa84d37', 'ec77ee80-1dce-4aae-b776-0e504e8b5eeb', '2024-04-21 01:03:49.495558', '2024-04-21 01:03:49.495562'),
('support@exampleorg.com', 'password456', 'Example Corporation 2', 'Food', '0987654321', '1990-01-01', '54321', '9876543210', 'None', 'http://www.exampleorg.org', '251349a2-195e-4046-b9c2-15868b083c3b', 'ce769f99-34c0-4b98-9947-5d637130df4b', 'c7ec371c-1f14-4316-ae11-69bae2ca31b1', '2024-04-21 01:03:49.495788', '2024-04-21 01:03:49.495790');


INSERT INTO users VALUES 
('john@example.com', 'password123', 'John', 'None', 'Doe', '1234567890', '1990-05-15', '51b937e9-a145-469c-9e5f-5c88df98bfc1', '1234567890', 'Engineer', 'None', 'Senior Engineer', 'ec77ee80-1dce-4aae-b776-0e504e8b5eeb', 'None', '75000.0', 'Playing guitar, hiking', 'john_pic.jpg', 'True', '2463fbfe-a6b3-44c0-accf-56f2cdff07a8', '2024-04-21 01:25:18.594517', '2024-04-21 01:25:18.594521'),
('jane@example.com', 'password456', 'Jane', 'None', 'Smith', '0987654321', '1990-10-20', 'b6631444-2a76-41f4-9e32-c83ce1ea2758', '9876543210', 'Designer', 'None', 'Lead Designer', 'c7ec371c-1f14-4316-ae11-69bae2ca31b1', 'None', '80000.0', 'Painting, photography', 'jane_pic.jpg', 'True', '8db748a7-5b31-446e-be34-16b557237a5b', '2024-04-21 01:25:18.594879', '2024-04-21 01:25:18.594883');


