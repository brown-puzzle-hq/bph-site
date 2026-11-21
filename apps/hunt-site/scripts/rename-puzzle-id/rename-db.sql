-- Renames puzzle primary keys and repoints FKs

-- local-criminology -> applied-criminology
INSERT INTO hunt_site_puzzle (id, name, answer)
SELECT 'applied-criminology', 'Applied Criminology', answer FROM hunt_site_puzzle WHERE id = 'local-criminology';
UPDATE hunt_site_unlock SET puzzle_id = 'applied-criminology' WHERE puzzle_id = 'local-criminology';
UPDATE hunt_site_solve SET puzzle_id = 'applied-criminology' WHERE puzzle_id = 'local-criminology';
UPDATE hunt_site_guess SET puzzle_id = 'applied-criminology' WHERE puzzle_id = 'local-criminology';
UPDATE hunt_site_hint SET puzzle_id = 'applied-criminology' WHERE puzzle_id = 'local-criminology';
UPDATE hunt_site_erratum SET puzzle_id = 'applied-criminology' WHERE puzzle_id = 'local-criminology';
UPDATE hunt_site_answer_token SET puzzle_id = 'applied-criminology' WHERE puzzle_id = 'local-criminology';
DELETE FROM hunt_site_puzzle WHERE id = 'local-criminology';

-- law -> bar-exam
INSERT INTO hunt_site_puzzle (id, name, answer)
SELECT 'bar-exam', 'Bar Exam', answer FROM hunt_site_puzzle WHERE id = 'law';
UPDATE hunt_site_unlock SET puzzle_id = 'bar-exam' WHERE puzzle_id = 'law';
UPDATE hunt_site_solve SET puzzle_id = 'bar-exam' WHERE puzzle_id = 'law';
UPDATE hunt_site_guess SET puzzle_id = 'bar-exam' WHERE puzzle_id = 'law';
UPDATE hunt_site_hint SET puzzle_id = 'bar-exam' WHERE puzzle_id = 'law';
UPDATE hunt_site_erratum SET puzzle_id = 'bar-exam' WHERE puzzle_id = 'law';
UPDATE hunt_site_answer_token SET puzzle_id = 'bar-exam' WHERE puzzle_id = 'law';
DELETE FROM hunt_site_puzzle WHERE id = 'law';
