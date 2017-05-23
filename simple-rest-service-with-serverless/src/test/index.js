import test from 'ava';
import m from '../';

const putPet = {
  species: "dog",
  breed: "great dane",
  name: "marmaduke"
};

const getPet = {
  species: "dog",
  breed: "great dane",
  name: "marmaduke"
};

test('put pet success', t => {
  t.pass();
});

test('get pet success', t => {
  t.pass();
});

test('post pet fail', t => {
  t.pass();
});
