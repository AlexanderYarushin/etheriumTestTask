CREATE TABLE transactions (
  id SERIAL NOT NULL PRIMARY KEY,
  createdAt TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	block_hash VARCHAR(255),
  block_number VARCHAR(255),
  from_addr VARCHAR(255),
  gas VARCHAR(255),
  gas_price VARCHAR(255),
  hash VARCHAR(255),
  input TEXT,
  nonce VARCHAR(255),
  to_addr VARCHAR(255),
  transaction_index VARCHAR(255),
  value VARCHAR(255),
  type VARCHAR(255),
  v VARCHAR(255),
  r VARCHAR(255),
  s VARCHAR(255)
);
