-- Renames puzzle primary keys and repoints FKs

-- applied-criminology -> local-criminology
INSERT INTO hunt_site_puzzle (id, name, answer)
SELECT 'local-criminology', 'Local Criminology', answer FROM hunt_site_puzzle WHERE id = 'applied-criminology';
UPDATE hunt_site_unlock SET puzzle_id = 'local-criminology' WHERE puzzle_id = 'applied-criminology';
UPDATE hunt_site_solve SET puzzle_id = 'local-criminology' WHERE puzzle_id = 'applied-criminology';
UPDATE hunt_site_guess SET puzzle_id = 'local-criminology' WHERE puzzle_id = 'applied-criminology';
UPDATE hunt_site_hint SET puzzle_id = 'local-criminology' WHERE puzzle_id = 'applied-criminology';
UPDATE hunt_site_erratum SET puzzle_id = 'local-criminology' WHERE puzzle_id = 'applied-criminology';
UPDATE hunt_site_answer_token SET puzzle_id = 'local-criminology' WHERE puzzle_id = 'applied-criminology';
DELETE FROM hunt_site_puzzle WHERE id = 'applied-criminology';

-- bar-exam -> law
INSERT INTO hunt_site_puzzle (id, name, answer)
SELECT 'law', 'Law', answer FROM hunt_site_puzzle WHERE id = 'bar-exam';
UPDATE hunt_site_unlock SET puzzle_id = 'law' WHERE puzzle_id = 'bar-exam';
UPDATE hunt_site_solve SET puzzle_id = 'law' WHERE puzzle_id = 'bar-exam';
UPDATE hunt_site_guess SET puzzle_id = 'law' WHERE puzzle_id = 'bar-exam';
UPDATE hunt_site_hint SET puzzle_id = 'law' WHERE puzzle_id = 'bar-exam';
UPDATE hunt_site_erratum SET puzzle_id = 'law' WHERE puzzle_id = 'bar-exam';
UPDATE hunt_site_answer_token SET puzzle_id = 'law' WHERE puzzle_id = 'bar-exam';
DELETE FROM hunt_site_puzzle WHERE id = 'bar-exam';

-- schmear-campaign -> schmear-campaigns
INSERT INTO hunt_site_puzzle (id, name, answer)
SELECT 'schmear-campaigns', 'Schmear Campaigns', answer FROM hunt_site_puzzle WHERE id = 'schmear-campaign';
UPDATE hunt_site_unlock SET puzzle_id = 'schmear-campaigns' WHERE puzzle_id = 'schmear-campaign';
UPDATE hunt_site_solve SET puzzle_id = 'schmear-campaigns' WHERE puzzle_id = 'schmear-campaign';
UPDATE hunt_site_guess SET puzzle_id = 'schmear-campaigns' WHERE puzzle_id = 'schmear-campaign';
UPDATE hunt_site_hint SET puzzle_id = 'schmear-campaigns' WHERE puzzle_id = 'schmear-campaign';
UPDATE hunt_site_erratum SET puzzle_id = 'schmear-campaigns' WHERE puzzle_id = 'schmear-campaign';
UPDATE hunt_site_answer_token SET puzzle_id = 'schmear-campaigns' WHERE puzzle_id = 'schmear-campaign';
DELETE FROM hunt_site_puzzle WHERE id = 'schmear-campaign';

-- rabbit-konundrum -> rabbit-nundrum
INSERT INTO hunt_site_puzzle (id, name, answer)
SELECT 'rabbit-nundrum', 'Rabbit ''Nundrum', answer FROM hunt_site_puzzle WHERE id = 'rabbit-konundrum';
UPDATE hunt_site_unlock SET puzzle_id = 'rabbit-nundrum' WHERE puzzle_id = 'rabbit-konundrum';
UPDATE hunt_site_solve SET puzzle_id = 'rabbit-nundrum' WHERE puzzle_id = 'rabbit-konundrum';
UPDATE hunt_site_guess SET puzzle_id = 'rabbit-nundrum' WHERE puzzle_id = 'rabbit-konundrum';
UPDATE hunt_site_hint SET puzzle_id = 'rabbit-nundrum' WHERE puzzle_id = 'rabbit-konundrum';
UPDATE hunt_site_erratum SET puzzle_id = 'rabbit-nundrum' WHERE puzzle_id = 'rabbit-konundrum';
UPDATE hunt_site_answer_token SET puzzle_id = 'rabbit-nundrum' WHERE puzzle_id = 'rabbit-konundrum';
DELETE FROM hunt_site_puzzle WHERE id = 'rabbit-konundrum';

-- sword-placeholder -> architecture-on-college-hill
INSERT INTO hunt_site_puzzle (id, name, answer)
SELECT 'architecture-on-college-hill', 'Architecture on College Hill', answer FROM hunt_site_puzzle WHERE id = 'sword-placeholder';
UPDATE hunt_site_unlock SET puzzle_id = 'architecture-on-college-hill' WHERE puzzle_id = 'sword-placeholder';
UPDATE hunt_site_solve SET puzzle_id = 'architecture-on-college-hill' WHERE puzzle_id = 'sword-placeholder';
UPDATE hunt_site_guess SET puzzle_id = 'architecture-on-college-hill' WHERE puzzle_id = 'sword-placeholder';
UPDATE hunt_site_hint SET puzzle_id = 'architecture-on-college-hill' WHERE puzzle_id = 'sword-placeholder';
UPDATE hunt_site_erratum SET puzzle_id = 'architecture-on-college-hill' WHERE puzzle_id = 'sword-placeholder';
UPDATE hunt_site_answer_token SET puzzle_id = 'architecture-on-college-hill' WHERE puzzle_id = 'sword-placeholder';
DELETE FROM hunt_site_puzzle WHERE id = 'sword-placeholder';

-- flying-through-the-grid -> avionic-intersectionality
INSERT INTO hunt_site_puzzle (id, name, answer)
SELECT 'avionic-intersectionality', 'Avionic Intersectionality', answer FROM hunt_site_puzzle WHERE id = 'flying-through-the-grid';
UPDATE hunt_site_unlock SET puzzle_id = 'avionic-intersectionality' WHERE puzzle_id = 'flying-through-the-grid';
UPDATE hunt_site_solve SET puzzle_id = 'avionic-intersectionality' WHERE puzzle_id = 'flying-through-the-grid';
UPDATE hunt_site_guess SET puzzle_id = 'avionic-intersectionality' WHERE puzzle_id = 'flying-through-the-grid';
UPDATE hunt_site_hint SET puzzle_id = 'avionic-intersectionality' WHERE puzzle_id = 'flying-through-the-grid';
UPDATE hunt_site_erratum SET puzzle_id = 'avionic-intersectionality' WHERE puzzle_id = 'flying-through-the-grid';
UPDATE hunt_site_answer_token SET puzzle_id = 'avionic-intersectionality' WHERE puzzle_id = 'flying-through-the-grid';
DELETE FROM hunt_site_puzzle WHERE id = 'flying-through-the-grid';

-- messy-placeholder -> itty-bitty-kitties
INSERT INTO hunt_site_puzzle (id, name, answer)
SELECT 'itty-bitty-kitties', 'Itty Bitty Kitties: A Bi-Nya-ry Study', answer FROM hunt_site_puzzle WHERE id = 'messy-placeholder';
UPDATE hunt_site_unlock SET puzzle_id = 'itty-bitty-kitties' WHERE puzzle_id = 'messy-placeholder';
UPDATE hunt_site_solve SET puzzle_id = 'itty-bitty-kitties' WHERE puzzle_id = 'messy-placeholder';
UPDATE hunt_site_guess SET puzzle_id = 'itty-bitty-kitties' WHERE puzzle_id = 'messy-placeholder';
UPDATE hunt_site_hint SET puzzle_id = 'itty-bitty-kitties' WHERE puzzle_id = 'messy-placeholder';
UPDATE hunt_site_erratum SET puzzle_id = 'itty-bitty-kitties' WHERE puzzle_id = 'messy-placeholder';
UPDATE hunt_site_answer_token SET puzzle_id = 'itty-bitty-kitties' WHERE puzzle_id = 'messy-placeholder';
DELETE FROM hunt_site_puzzle WHERE id = 'messy-placeholder';

-- embeddings -> analogical-semantics
INSERT INTO hunt_site_puzzle (id, name, answer)
SELECT 'analogical-semantics', 'Analogical Semantics', answer FROM hunt_site_puzzle WHERE id = 'embeddings';
UPDATE hunt_site_unlock SET puzzle_id = 'analogical-semantics' WHERE puzzle_id = 'embeddings';
UPDATE hunt_site_solve SET puzzle_id = 'analogical-semantics' WHERE puzzle_id = 'embeddings';
UPDATE hunt_site_guess SET puzzle_id = 'analogical-semantics' WHERE puzzle_id = 'embeddings';
UPDATE hunt_site_hint SET puzzle_id = 'analogical-semantics' WHERE puzzle_id = 'embeddings';
UPDATE hunt_site_erratum SET puzzle_id = 'analogical-semantics' WHERE puzzle_id = 'embeddings';
UPDATE hunt_site_answer_token SET puzzle_id = 'analogical-semantics' WHERE puzzle_id = 'embeddings';
DELETE FROM hunt_site_puzzle WHERE id = 'embeddings';

-- crossoverword -> serialized-storytelling
INSERT INTO hunt_site_puzzle (id, name, answer)
SELECT 'serialized-storytelling', 'Serialized Storytelling', answer FROM hunt_site_puzzle WHERE id = 'crossoverword';
UPDATE hunt_site_unlock SET puzzle_id = 'serialized-storytelling' WHERE puzzle_id = 'crossoverword';
UPDATE hunt_site_solve SET puzzle_id = 'serialized-storytelling' WHERE puzzle_id = 'crossoverword';
UPDATE hunt_site_guess SET puzzle_id = 'serialized-storytelling' WHERE puzzle_id = 'crossoverword';
UPDATE hunt_site_hint SET puzzle_id = 'serialized-storytelling' WHERE puzzle_id = 'crossoverword';
UPDATE hunt_site_erratum SET puzzle_id = 'serialized-storytelling' WHERE puzzle_id = 'crossoverword';
UPDATE hunt_site_answer_token SET puzzle_id = 'serialized-storytelling' WHERE puzzle_id = 'crossoverword';
DELETE FROM hunt_site_puzzle WHERE id = 'crossoverword';

-- wordbrain -> characters-in-flight
INSERT INTO hunt_site_puzzle (id, name, answer)
SELECT 'characters-in-flight', 'Characters in Flight', answer FROM hunt_site_puzzle WHERE id = 'wordbrain';
UPDATE hunt_site_unlock SET puzzle_id = 'characters-in-flight' WHERE puzzle_id = 'wordbrain';
UPDATE hunt_site_solve SET puzzle_id = 'characters-in-flight' WHERE puzzle_id = 'wordbrain';
UPDATE hunt_site_guess SET puzzle_id = 'characters-in-flight' WHERE puzzle_id = 'wordbrain';
UPDATE hunt_site_hint SET puzzle_id = 'characters-in-flight' WHERE puzzle_id = 'wordbrain';
UPDATE hunt_site_erratum SET puzzle_id = 'characters-in-flight' WHERE puzzle_id = 'wordbrain';
UPDATE hunt_site_answer_token SET puzzle_id = 'characters-in-flight' WHERE puzzle_id = 'wordbrain';
DELETE FROM hunt_site_puzzle WHERE id = 'wordbrain';

-- pageant-problems -> voting-dynamics
INSERT INTO hunt_site_puzzle (id, name, answer)
SELECT 'voting-dynamics', 'Voting Dynamics', answer FROM hunt_site_puzzle WHERE id = 'pageant-problems';
UPDATE hunt_site_unlock SET puzzle_id = 'voting-dynamics' WHERE puzzle_id = 'pageant-problems';
UPDATE hunt_site_solve SET puzzle_id = 'voting-dynamics' WHERE puzzle_id = 'pageant-problems';
UPDATE hunt_site_guess SET puzzle_id = 'voting-dynamics' WHERE puzzle_id = 'pageant-problems';
UPDATE hunt_site_hint SET puzzle_id = 'voting-dynamics' WHERE puzzle_id = 'pageant-problems';
UPDATE hunt_site_erratum SET puzzle_id = 'voting-dynamics' WHERE puzzle_id = 'pageant-problems';
UPDATE hunt_site_answer_token SET puzzle_id = 'voting-dynamics' WHERE puzzle_id = 'pageant-problems';
DELETE FROM hunt_site_puzzle WHERE id = 'pageant-problems';

-- hash-hash-hash-hash-bang -> scacchic-fabrication
INSERT INTO hunt_site_puzzle (id, name, answer)
SELECT 'scacchic-fabrication', 'Scacchic Fabrication', answer FROM hunt_site_puzzle WHERE id = 'hash-hash-hash-hash-bang';
UPDATE hunt_site_unlock SET puzzle_id = 'scacchic-fabrication' WHERE puzzle_id = 'hash-hash-hash-hash-bang';
UPDATE hunt_site_solve SET puzzle_id = 'scacchic-fabrication' WHERE puzzle_id = 'hash-hash-hash-hash-bang';
UPDATE hunt_site_guess SET puzzle_id = 'scacchic-fabrication' WHERE puzzle_id = 'hash-hash-hash-hash-bang';
UPDATE hunt_site_hint SET puzzle_id = 'scacchic-fabrication' WHERE puzzle_id = 'hash-hash-hash-hash-bang';
UPDATE hunt_site_erratum SET puzzle_id = 'scacchic-fabrication' WHERE puzzle_id = 'hash-hash-hash-hash-bang';
UPDATE hunt_site_answer_token SET puzzle_id = 'scacchic-fabrication' WHERE puzzle_id = 'hash-hash-hash-hash-bang';
DELETE FROM hunt_site_puzzle WHERE id = 'hash-hash-hash-hash-bang';

-- date-everything-brown -> how-to-get-your-heart-broken
INSERT INTO hunt_site_puzzle (id, name, answer)
SELECT 'how-to-get-your-heart-broken', 'How To Get Your Heart Broken', answer FROM hunt_site_puzzle WHERE id = 'date-everything-brown';
UPDATE hunt_site_unlock SET puzzle_id = 'how-to-get-your-heart-broken' WHERE puzzle_id = 'date-everything-brown';
UPDATE hunt_site_solve SET puzzle_id = 'how-to-get-your-heart-broken' WHERE puzzle_id = 'date-everything-brown';
UPDATE hunt_site_guess SET puzzle_id = 'how-to-get-your-heart-broken' WHERE puzzle_id = 'date-everything-brown';
UPDATE hunt_site_hint SET puzzle_id = 'how-to-get-your-heart-broken' WHERE puzzle_id = 'date-everything-brown';
UPDATE hunt_site_erratum SET puzzle_id = 'how-to-get-your-heart-broken' WHERE puzzle_id = 'date-everything-brown';
UPDATE hunt_site_answer_token SET puzzle_id = 'how-to-get-your-heart-broken' WHERE puzzle_id = 'date-everything-brown';
DELETE FROM hunt_site_puzzle WHERE id = 'date-everything-brown';

-- one-guard-no-doors -> topics-in-guard-door-theory
INSERT INTO hunt_site_puzzle (id, name, answer)
SELECT 'topics-in-guard-door-theory', 'Topics in Guard-Door Theory', answer FROM hunt_site_puzzle WHERE id = 'one-guard-no-doors';
UPDATE hunt_site_unlock SET puzzle_id = 'topics-in-guard-door-theory' WHERE puzzle_id = 'one-guard-no-doors';
UPDATE hunt_site_solve SET puzzle_id = 'topics-in-guard-door-theory' WHERE puzzle_id = 'one-guard-no-doors';
UPDATE hunt_site_guess SET puzzle_id = 'topics-in-guard-door-theory' WHERE puzzle_id = 'one-guard-no-doors';
UPDATE hunt_site_hint SET puzzle_id = 'topics-in-guard-door-theory' WHERE puzzle_id = 'one-guard-no-doors';
UPDATE hunt_site_erratum SET puzzle_id = 'topics-in-guard-door-theory' WHERE puzzle_id = 'one-guard-no-doors';
UPDATE hunt_site_answer_token SET puzzle_id = 'topics-in-guard-door-theory' WHERE puzzle_id = 'one-guard-no-doors';
DELETE FROM hunt_site_puzzle WHERE id = 'one-guard-no-doors';

-- movable-chorale -> collaborative-chorale
INSERT INTO hunt_site_puzzle (id, name, answer)
SELECT 'collaborative-chorale', 'Collaborative Chorale', answer FROM hunt_site_puzzle WHERE id = 'movable-chorale';
UPDATE hunt_site_unlock SET puzzle_id = 'collaborative-chorale' WHERE puzzle_id = 'movable-chorale';
UPDATE hunt_site_solve SET puzzle_id = 'collaborative-chorale' WHERE puzzle_id = 'movable-chorale';
UPDATE hunt_site_guess SET puzzle_id = 'collaborative-chorale' WHERE puzzle_id = 'movable-chorale';
UPDATE hunt_site_hint SET puzzle_id = 'collaborative-chorale' WHERE puzzle_id = 'movable-chorale';
UPDATE hunt_site_erratum SET puzzle_id = 'collaborative-chorale' WHERE puzzle_id = 'movable-chorale';
UPDATE hunt_site_answer_token SET puzzle_id = 'collaborative-chorale' WHERE puzzle_id = 'movable-chorale';
DELETE FROM hunt_site_puzzle WHERE id = 'movable-chorale';

-- intro-to-ubpcosu-final-exam -> ubpcosu-ii
INSERT INTO hunt_site_puzzle (id, name, answer)
SELECT 'ubpcosu-ii', 'Ubpcosu II', answer FROM hunt_site_puzzle WHERE id = 'intro-to-ubpcosu-final-exam';
UPDATE hunt_site_unlock SET puzzle_id = 'ubpcosu-ii' WHERE puzzle_id = 'intro-to-ubpcosu-final-exam';
UPDATE hunt_site_solve SET puzzle_id = 'ubpcosu-ii' WHERE puzzle_id = 'intro-to-ubpcosu-final-exam';
UPDATE hunt_site_guess SET puzzle_id = 'ubpcosu-ii' WHERE puzzle_id = 'intro-to-ubpcosu-final-exam';
UPDATE hunt_site_hint SET puzzle_id = 'ubpcosu-ii' WHERE puzzle_id = 'intro-to-ubpcosu-final-exam';
UPDATE hunt_site_erratum SET puzzle_id = 'ubpcosu-ii' WHERE puzzle_id = 'intro-to-ubpcosu-final-exam';
UPDATE hunt_site_answer_token SET puzzle_id = 'ubpcosu-ii' WHERE puzzle_id = 'intro-to-ubpcosu-final-exam';
DELETE FROM hunt_site_puzzle WHERE id = 'intro-to-ubpcosu-final-exam';

-- intro-to-ubpcosu-first-lecture -> ubpcosu-i
INSERT INTO hunt_site_puzzle (id, name, answer)
SELECT 'ubpcosu-i', 'Ubpcosu I', answer FROM hunt_site_puzzle WHERE id = 'intro-to-ubpcosu-first-lecture';
UPDATE hunt_site_unlock SET puzzle_id = 'ubpcosu-i' WHERE puzzle_id = 'intro-to-ubpcosu-first-lecture';
UPDATE hunt_site_solve SET puzzle_id = 'ubpcosu-i' WHERE puzzle_id = 'intro-to-ubpcosu-first-lecture';
UPDATE hunt_site_guess SET puzzle_id = 'ubpcosu-i' WHERE puzzle_id = 'intro-to-ubpcosu-first-lecture';
UPDATE hunt_site_hint SET puzzle_id = 'ubpcosu-i' WHERE puzzle_id = 'intro-to-ubpcosu-first-lecture';
UPDATE hunt_site_erratum SET puzzle_id = 'ubpcosu-i' WHERE puzzle_id = 'intro-to-ubpcosu-first-lecture';
UPDATE hunt_site_answer_token SET puzzle_id = 'ubpcosu-i' WHERE puzzle_id = 'intro-to-ubpcosu-first-lecture';
DELETE FROM hunt_site_puzzle WHERE id = 'intro-to-ubpcosu-first-lecture';
