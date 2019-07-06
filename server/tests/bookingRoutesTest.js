import { chai, expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);

// user book trip {post}
// user see their own booking {get}
// admin view all bookinkgs {get}
// user delete their own booking {delete}
// admin cancel a trip {patch}
